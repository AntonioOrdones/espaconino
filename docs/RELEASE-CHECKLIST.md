# Checklist de publicação

Use este checklist antes de fazer merge na `main`.

## Conteúdo

- [ ] Nomes, registros, convênios e dados institucionais foram conferidos.
- [ ] Não há conteúdo de paciente ou dado sensível.
- [ ] Não há promessa clínica ou informação inventada.
- [ ] Textos foram revisados em português.

## HTML e navegação

- [ ] A página possui H1 adequado.
- [ ] Links locais funcionam.
- [ ] Menu desktop e menu mobile funcionam.
- [ ] WhatsApp e telefone apontam para destinos corretos.
- [ ] Não há referência ao blog removido.
- [ ] Novas imagens têm `alt`, `width` e `height`.

## SEO

- [ ] `title` é específico.
- [ ] Meta description é específica.
- [ ] Canonical está correto.
- [ ] Open Graph está correto.
- [ ] JSON-LD continua válido.
- [ ] `sitemap.xml` foi atualizado se a URL ou indexabilidade mudou.
- [ ] Dados de Águas Claras/Brasília estão consistentes.

## Acessibilidade

- [ ] A página funciona por teclado.
- [ ] O foco é visível.
- [ ] O zoom a 200% não impede uso.
- [ ] Redução de movimento continua respeitada.
- [ ] Contraste e tamanho de texto continuam utilizáveis.
- [ ] Formulários possuem labels e mensagens compreensíveis.

## Código

- [ ] `python3 scripts/check_site.py` passou.
- [ ] Se o SCSS mudou, `css/main.css` foi recompilado.
- [ ] Não há senha, token ou chave privada.
- [ ] O console do navegador não apresenta erro novo.
- [ ] Não foram adicionadas dependências externas sem documentação.

## Produção

- [ ] GitHub Actions terminou com sucesso.
- [ ] GitHub Pages publicou o SHA esperado.
- [ ] A página foi conferida em produção.
- [ ] O teste foi feito também sem cache ou em janela anônima.
