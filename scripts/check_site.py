#!/usr/bin/env python3
"""Validações locais do site estático do Espaço Niño.

Sem dependências externas. Verifica:
- referências locais em HTML;
- IDs duplicados;
- JSON-LD;
- title, meta description e canonical das páginas indexáveis;
- sitemap.xml;
- arquivos essenciais.

Uso:
    python3 scripts/check_site.py
"""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://antonioordones.github.io/espaconino/"

ESSENTIAL_FILES = [
    ROOT / "index.html",
    ROOT / "css/main.css",
    ROOT / "scss/main.scss",
    ROOT / "js/main.js",
    ROOT / "robots.txt",
    ROOT / "sitemap.xml",
]

REFERENCE_ATTRS = {
    "a": ("href",),
    "link": ("href",),
    "img": ("src",),
    "script": ("src",),
    "source": ("src",),
    "video": ("src", "poster"),
    "audio": ("src",),
    "iframe": ("src",),
}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[str] = []
        self.ids: list[str] = []
        self.in_jsonld = False
        self.jsonld_buffer: list[str] = []
        self.jsonld_blocks: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)

        element_id = attrs_dict.get("id")
        if element_id:
            self.ids.append(element_id)

        for attr in REFERENCE_ATTRS.get(tag, ()):
            value = attrs_dict.get(attr)
            if value:
                self.refs.append(value)

        if tag == "script" and (attrs_dict.get("type") or "").lower() == "application/ld+json":
            self.in_jsonld = True
            self.jsonld_buffer = []

    def handle_data(self, data: str) -> None:
        if self.in_jsonld:
            self.jsonld_buffer.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self.in_jsonld:
            self.jsonld_blocks.append("".join(self.jsonld_buffer).strip())
            self.in_jsonld = False
            self.jsonld_buffer = []


def is_indexable(page: Path) -> bool:
    rel = page.relative_to(ROOT).as_posix()
    return rel == "index.html" or rel == "convenios/index.html" or rel.startswith("servicos/")


def expected_url(page: Path) -> str:
    rel = page.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return BASE_URL
    if rel.endswith("/index.html"):
        return BASE_URL + rel[: -len("index.html")]
    return BASE_URL + rel


def resolve_local_ref(page: Path, ref: str) -> Path | None:
    ref = ref.strip()
    if not ref or ref.startswith("#"):
        return None

    parsed = urlsplit(ref)
    if parsed.scheme or parsed.netloc or ref.startswith("//"):
        return None

    raw_path = unquote(parsed.path)
    if not raw_path:
        return None

    if raw_path.startswith("/espaconino/"):
        raw_path = raw_path[len("/espaconino/") :]
        target = ROOT / raw_path
    elif raw_path.startswith("/"):
        # Caminho absoluto de outro contexto do host. Não é um arquivo local
        # do projeto e não deve ser inferido automaticamente.
        return None
    else:
        target = page.parent / raw_path

    target = target.resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        raise ValueError(f"referência sai da raiz do projeto: {ref}")

    if raw_path.endswith("/") or target.is_dir():
        target = target / "index.html"

    return target


def first_match(pattern: str, html: str) -> str | None:
    match = re.search(pattern, html, flags=re.IGNORECASE | re.DOTALL)
    return match.group(1).strip() if match else None


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    for required in ESSENTIAL_FILES:
        if not required.exists():
            errors.append(f"Arquivo essencial ausente: {required.relative_to(ROOT)}")

    html_files = sorted(ROOT.rglob("*.html"))
    titles: dict[str, str] = {}
    canonicals: dict[str, str] = {}

    for page in html_files:
        rel = page.relative_to(ROOT).as_posix()
        html = page.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(html)

        duplicates = [item for item, count in Counter(parser.ids).items() if count > 1]
        for duplicate in duplicates:
            errors.append(f"{rel}: id duplicado: #{duplicate}")

        for ref in parser.refs:
            try:
                target = resolve_local_ref(page, ref)
            except ValueError as exc:
                errors.append(f"{rel}: {exc}")
                continue
            if target is not None and not target.exists():
                errors.append(f"{rel}: referência local inexistente: {ref}")

        for block_number, block in enumerate(parser.jsonld_blocks, start=1):
            if not block:
                continue
            try:
                json.loads(block)
            except json.JSONDecodeError as exc:
                errors.append(f"{rel}: JSON-LD {block_number} inválido: {exc}")

        if is_indexable(page):
            title = first_match(r"<title>(.*?)</title>", html)
            description = first_match(
                r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']',
                html,
            )
            if description is None:
                description = first_match(
                    r'<meta\s+content=["\'](.*?)["\']\s+name=["\']description["\']',
                    html,
                )
            canonical = first_match(
                r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']',
                html,
            )
            if canonical is None:
                canonical = first_match(
                    r'<link\s+href=["\'](.*?)["\']\s+rel=["\']canonical["\']',
                    html,
                )

            if not title:
                errors.append(f"{rel}: title ausente")
            else:
                if title in titles:
                    errors.append(f"{rel}: title duplicado com {titles[title]}: {title}")
                titles[title] = rel

            if not description:
                errors.append(f"{rel}: meta description ausente")

            expected = expected_url(page)
            if not canonical:
                errors.append(f"{rel}: canonical ausente")
            elif canonical != expected:
                errors.append(f"{rel}: canonical inesperado: {canonical} (esperado {expected})")
            else:
                canonicals[rel] = canonical

    sitemap = ROOT / "sitemap.xml"
    if sitemap.exists():
        try:
            tree = ET.parse(sitemap)
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            urls = [
                (node.text or "").strip()
                for node in tree.findall(".//sm:loc", ns)
                if (node.text or "").strip()
            ]
            if len(urls) != len(set(urls)):
                errors.append("sitemap.xml: URLs duplicadas")

            expected_urls = {
                expected_url(page)
                for page in html_files
                if is_indexable(page)
            }
            sitemap_urls = set(urls)
            for url in sorted(expected_urls - sitemap_urls):
                errors.append(f"sitemap.xml: URL indexável ausente: {url}")
            for url in sorted(sitemap_urls - expected_urls):
                warnings.append(f"sitemap.xml: URL sem página indexável correspondente: {url}")
        except ET.ParseError as exc:
            errors.append(f"sitemap.xml inválido: {exc}")

    print(f"HTML verificados: {len(html_files)}")
    print(f"Páginas indexáveis: {len(canonicals)}")

    if warnings:
        print("\nAvisos:")
        for warning in warnings:
            print(f"  - {warning}")

    if errors:
        print("\nErros:")
        for error in errors:
            print(f"  - {error}")
        return 1

    print("\nOK: validações concluídas sem erro.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
