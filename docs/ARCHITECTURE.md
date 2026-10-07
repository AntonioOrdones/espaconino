# Arquitetura

## Visão geral

O Espaço Niño é um site estático publicado no GitHub Pages.

Fluxo de execução:

```text
Navegador
  ├── HTML das páginas
  ├── css/main.css
  ├── js/main.js
  ├── assets locais
  └── integrações externas no navegador
```

Não existe API própria, banco de dados, servidor de aplicação ou etapa de renderização no backend.

## Mapa de páginas

| Rota | Arquivo | Função |
| --- | --- | --- |
| `/` | `index.html` | Home institucional |
| `/servicos/` | `servicos/index.html` | Hub de serviços |
| `/servicos/avaliacao-inicial/` | `servicos/avaliacao-inicial/index.html` | Serviço |
| `/servicos/terapia-ocupacional/` | `servicos/terapia-ocupacional/index.html` | Serviço |
| `/servicos/fonoaudiologia/` | `servicos/fonoaudiologia/index.html` | Serviço |
| `/servicos/psicologia-infantil/` | `servicos/psicologia-infantil/index.html` | Serviço |
| `/servicos/psicopedagogia/` | `servicos/psicopedagogia/index.html` | Serviço |
| `/servicos/psicomotricidade/` | `servicos/psicomotricidade/index.html` | Serviço |
| `/servicos/fisioterapia/` | `servicos/fisioterapia/index.html` | Serviço |
| `/convenios/` | `convenios/index.html` | Busca textual de convênios |
| `/privacidade.html` | `privacidade.html` | Política de Privacidade |
| `/lgpd.html` | `lgpd.html` | Canal e informações LGPD |
| `/termos.html` | `termos.html` | Termos de Uso |
| `/acessibilidade.html` | `acessibilidade.html` | Declaração de Acessibilidade |
| rota inexistente | `404.html` | Página de erro |

## Camada de estilos

`scss/main.scss` é a fonte de verdade.

`css/main.css` é o arquivo compilado usado pelas páginas.

O SCSS contém:

- breakpoints e mixins;
- design tokens;
- reset e base;
- layout;
- componentes da home;
- páginas de serviços;
- equipe e galeria;
- convênios;
- widgets;
- chatbot e diálogos;
- acessibilidade;
- páginas legais.

Evite criar CSS paralelo para um componente já coberto por `main.scss`.

## JavaScript

`js/main.js` concentra os comportamentos compartilhados.

Principais módulos internos:

1. navegação e cabeçalho;
2. animações;
3. busca de convênios;
4. FAQ;
5. formulários e WhatsApp;
6. mapa sob demanda;
7. preferências locais;
8. acessibilidade;
9. consentimento;
10. galeria;
11. feedback;
12. boletim;
13. chatbot Nino;
14. carrossel de convênios;
15. analytics.

O arquivo usa uma IIFE e `'use strict'` para reduzir vazamento de estado global.

## Assets

- `assets/equipe/`: fotos de profissionais;
- `assets/espaco/`: fotos da clínica;
- `assets/logo-espaco-nino.webp`: marca principal;
- `assets/logo-espaco-nino-branca.webp`: marca para fundos escuros;
- `assets/marca-icone.webp`: símbolo;
- favicons e Apple touch icon na raiz de `assets/`;
- `assets/qr-whatsapp.png`: QR do WhatsApp.

O `favicon.ico` da raiz é mantido como fallback convencional para navegadores e robôs.

## Conteúdo externo

O site também depende de recursos que não estão neste repositório:

- Google Fonts;
- Elfsight para avaliações e Instagram;
- VLibras;
- Google Maps;
- WhatsApp;
- logotipos de convênios hospedados por terceiros.

Falhas nesses serviços não devem impedir a navegação básica do site. O carrossel de convênios possui fallback textual quando uma imagem externa falha.

## SEO

As páginas públicas indexáveis usam a base:

`https://antonioordones.github.io/espaconino/`

Se houver domínio próprio, consulte [DEPLOYMENT.md](DEPLOYMENT.md) antes da troca.

## Decisões de arquitetura

### Site estático

Mantido por simplicidade operacional, baixo custo e compatibilidade direta com GitHub Pages.

### CSS compilado versionado

O CSS gerado é commitado porque o GitHub Pages precisa conseguir publicar o site sem depender de uma etapa Sass personalizada.

### URLs preservadas

As rotas atuais devem ser tratadas como públicas. Não mova páginas apenas para reorganizar pastas internas. Prefira organizar documentação e ferramentas sem alterar URLs.

### Sem blog

O blog foi removido em outubro de 2026. Não existem rota, item de menu ou integração de blog na arquitetura atual.
