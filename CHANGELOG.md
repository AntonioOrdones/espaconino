# Changelog

Histórico das alterações relevantes do site. O projeto ainda não adota versionamento semântico; por isso, as entradas são organizadas por data.

## 2026-10-07

### Organização e manutenção

- documentação do projeto consolidada e atualizada;
- adicionados guias de arquitetura, manutenção, publicação, SEO, acessibilidade, privacidade e conteúdo;
- adicionados modelos de issue e pull request para trabalho em equipe;
- adicionado verificador local de HTML, links locais, JSON-LD e sitemap;
- adicionado workflow de qualidade no GitHub Actions;
- adicionados `.editorconfig`, `.gitattributes`, `.gitignore` e `.nojekyll`;
- removidos arquivos binários antigos e duplicados da raiz que não eram usados pelo site;
- `CHANGELOG-SEO.md` foi consolidado neste arquivo.

### Conteúdo e interface

- removidas todas as referências ao antigo blog;
- revisão editorial para reduzir construções artificiais e travessões desnecessários;
- ajustada a quebra de linha do título da seção por faixa etária.

## 2026-10-02

- inserida a equipe multiprofissional informada pela clínica, com nomes, áreas e registros;
- corrigida a correspondência entre profissionais e fotografias;
- adicionada a fotografia de Beatriz Mares;
- adicionada Dra. Laura Tavares como fisioterapeuta e gestora;
- substituídas imagens ilustrativas da galeria por fotos reais do Espaço Niño;
- restaurados o carrossel de convênios e o painel de avaliações do Google;
- padronizada a navegação entre home, convênios e páginas de serviços.

## 2026-09-30

### Arquitetura de conteúdo e SEO local

- criada a página-hub `/servicos/`;
- criadas páginas próprias para Avaliação Inicial, Terapia Ocupacional, Fonoaudiologia, Psicologia Infantil, Psicopedagogia, Psicomotricidade e Fisioterapia;
- criada a página `/convenios/`;
- adicionados títulos, meta descriptions, canonicals, Open Graph, breadcrumbs e JSON-LD específicos;
- adicionados `sitemap.xml`, `robots.txt` e `404.html`;
- atualizados links internos da home e dos serviços;
- adicionada instrumentação para eventos de conversão e interação;
- preparado carregamento de GA4 quando houver um Measurement ID válido;
- documentada a URL canônica de GitHub Pages.

## Observações históricas

O site publicado é HTML5 + Sass/CSS + JavaScript puro. Não há React, backend ou banco de dados neste repositório.
