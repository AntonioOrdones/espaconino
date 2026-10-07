# Publicação e rollback

## Ambiente de produção

- repositório: `AntonioOrdones/espaconino`;
- branch de produção: `main`;
- hospedagem: GitHub Pages;
- URL atual: `https://antonioordones.github.io/espaconino/`.

Um merge ou push na `main` inicia a publicação no GitHub Pages.

## Antes do merge

1. rode `python3 scripts/check_site.py`;
2. verifique o GitHub Actions;
3. teste a página alterada em desktop e celular;
4. teste teclado e foco;
5. se o SCSS mudou, confirme que `css/main.css` foi regenerado;
6. confira o checklist em [RELEASE-CHECKLIST.md](RELEASE-CHECKLIST.md).

## Depois do merge

No GitHub:

1. abra **Actions**;
2. confirme o workflow de qualidade;
3. confirme o workflow **pages build and deployment**;
4. aguarde o status `success`;
5. abra a URL de produção;
6. se o navegador mostrar versão antiga, use `Ctrl + Shift + R` ou uma janela anônima.

Para diferenciar cache de problema de deploy, também é possível abrir temporariamente:

```text
https://antonioordones.github.io/espaconino/?v=<sha-do-commit>
```

O parâmetro serve apenas para teste. Não altere canonicals por causa dele.

## Rollback

Se uma publicação causar erro:

1. identifique o commit estável anterior;
2. prefira `git revert <sha>` em vez de reescrever o histórico;
3. faça merge/push do revert na `main`;
4. aguarde o novo deploy;
5. valide a produção.

Não use force push na `main` como procedimento normal de rollback.

## Domínio próprio

Antes de ativar um domínio próprio:

- configurar o domínio no GitHub Pages;
- criar o arquivo `CNAME`, quando aplicável;
- atualizar todos os canonicals;
- atualizar `og:url` e imagens absolutas;
- atualizar JSON-LD;
- atualizar `sitemap.xml`;
- atualizar a linha Sitemap de `robots.txt`;
- configurar Search Console;
- revisar HTTPS;
- testar redirecionamento entre domínio antigo e novo.

## Cache e propagação

O GitHub Pages pode terminar o workflow antes de todos os caches intermediários refletirem a nova versão. Em validações urgentes, compare o SHA publicado com o SHA da `main` e use recarregamento sem cache.

## Segredos

GitHub Pages publica arquivos do repositório. Não use arquivos HTML, JS, YAML ou Markdown para armazenar segredos.

Se uma automação futura precisar de segredo, use GitHub Actions Secrets e nunca escreva o valor em logs.
