# SEO e acessibilidade

Este documento reúne os critérios que devem ser preservados em qualquer manutenção.

## SEO técnico

As páginas indexáveis devem manter:

- um `title` único;
- uma meta description própria;
- um H1 coerente com a intenção da página;
- canonical autorreferente;
- Open Graph;
- links internos rastreáveis em HTML;
- conteúdo principal disponível sem depender de JavaScript;
- JSON-LD válido quando aplicável;
- status 200 e URL estável.

As páginas de serviço usam `Service` e `BreadcrumbList`. A home usa dados estruturados institucionais.

Não adicione `FAQPage` apenas para tentar obter destaque em busca. O FAQ visível pode existir sem esse schema.

## SEO local

Mantenha consistentes:

- nome da clínica;
- endereço;
- telefone;
- horário;
- referência a Águas Claras/Brasília quando fizer sentido para a página.

A mesma informação deve ser conferida também no Google Business Profile e em outros cadastros externos.

Evite criar páginas por bairro ou cidade com texto quase idêntico. Uma página deve existir porque responde a uma intenção real de usuário.

## Sitemap e robots

`sitemap.xml` contém apenas URLs que devem ser indexadas.

Ao adicionar, remover ou alterar URL pública:

1. atualize o sitemap;
2. ajuste `lastmod` para uma data em que houve mudança material no conteúdo;
3. confira `robots.txt`;
4. confirme canonical e links internos.

Páginas legais marcadas como `noindex` não precisam entrar no sitemap.

## Conteúdo de saúde

O projeto trata de saúde e desenvolvimento infantil. Por isso:

- identifique profissionais e registros corretamente;
- não invente especializações;
- evite promessas de resultado;
- descreva abordagens com linguagem informativa;
- mantenha revisão humana da clínica para conteúdo clínico;
- diferencie informação institucional de orientação clínica individual.

## Acessibilidade

Ao alterar HTML ou CSS, preserve:

- skip link;
- landmarks semânticos;
- hierarquia de títulos;
- labels de campos;
- foco visível;
- navegação por teclado;
- textos alternativos;
- contraste;
- `prefers-reduced-motion`;
- controles de tamanho de texto e alto contraste;
- comportamento previsível de menus e diálogos.

O VLibras é um recurso complementar e não substitui HTML acessível.

## Imagens

Use `alt` de acordo com a função da imagem.

Para retratos da equipe, identifique nome e função. Para ambientes, descreva o ambiente. Evite palavras-chave artificiais e descrição estética desnecessária.

Defina `width` e `height` para reduzir mudança de layout.

## Verificação prática

Antes de publicar uma mudança relevante:

- navegue apenas com teclado;
- teste em largura de celular;
- aumente o zoom para 200%;
- ative redução de movimento no sistema;
- confira títulos e descrições;
- valide links locais com `python3 scripts/check_site.py`;
- revise a página no Search Console após mudanças importantes de URL ou conteúdo.
