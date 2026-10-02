# Changelog — páginas de serviços e SEO local

Data: 30/09/2026

## O que foi implementado

- Criada uma página-hub em `servicos/index.html`.
- Criadas páginas próprias, indexáveis e com conteúdo exclusivo para:
  - `servicos/avaliacao-inicial/index.html`
  - `servicos/terapia-ocupacional/index.html`
  - `servicos/fonoaudiologia/index.html`
  - `servicos/psicologia-infantil/index.html`
  - `servicos/psicopedagogia/index.html`
- Cada página recebeu:
  - `title` exclusivo;
  - `meta description` exclusiva;
  - referência explícita a **Águas Claras/Brasília**;
  - H1 exclusivo;
  - canonical autorreferente;
  - Open Graph e Twitter Card;
  - breadcrumbs visuais;
  - JSON-LD `Service` + `BreadcrumbList`;
  - links contextuais para outros serviços;
  - CTA específico para WhatsApp;
  - conteúdo substancial e diferente entre os serviços;
  - FAQ visível sem uso de `FAQPage` apenas para ganho de SEO.
- A home (`index.html`) passou a:
  - apontar para cada página de serviço com links HTML rastreáveis;
  - apontar a etapa de avaliação inicial para a página específica;
  - ter canonical, Open Graph ampliado, Twitter Card e JSON-LD `MedicalClinic`;
  - corrigir a inconsistência de “7 especialidades” para 6 especialidades efetivamente listadas.
- O chatbot (`js/main.js`) foi ajustado para apontar para a nova área de serviços e para usar a contagem consistente de especialidades.
- Adicionados `sitemap.xml` e `robots.txt`.
- Adicionados estilos responsivos específicos das páginas de serviço em:
  - `scss/main.scss`
  - `css/main.css`
- `README.md` atualizado com a nova arquitetura e observações de publicação.

## URL canônica configurada

Como o repositório está com GitHub Pages habilitado e não possui `CNAME`, foi usado:

`https://antonioordones.github.io/espaconino/`

Se houver domínio próprio em produção, substitua esse prefixo nos canonicals, JSON-LD, Open Graph, `sitemap.xml` e `robots.txt`.

## Dados preservados do código atual

Foram reutilizados apenas dados já existentes no repositório para informações institucionais e locais, incluindo:

- Espaço Niño;
- Edifício Le Quartier;
- Av. Pau Brasil, 10, Sala 1101;
- Águas Claras — Brasília/DF;
- WhatsApp `(61) 99155-7014`;
- horário de segunda a sexta, das 8h às 18h;
- Instagram `@espaconinoterapias`.

## Validações executadas

- Parsing de todos os HTMLs sem erro.
- Parsing de todos os blocos JSON-LD sem erro.
- Validação de links e recursos locais: nenhum caminho inexistente encontrado.
- Parsing de `sitemap.xml` sem erro.
- Teste local por HTTP com retorno `200` para home, hub de serviços, cinco páginas de serviço, sitemap e robots.

## Observação técnica

O repositório atualmente versionado é HTML5 + Sass/CSS + JavaScript puro. Não há arquivos React no projeto publicado no GitHub.

Os arquivos `main.css` e `main.js` existentes na raiz são, na realidade, arquivos binários WebP duplicados e não são referenciados pela home. Eles foram mantidos sem alteração para não remover arquivos do projeto sem autorização. Os arquivos efetivamente usados pelo site são `css/main.css` e `js/main.js`.


## Segunda rodada — boas práticas remanescentes (30/09/2026)

- Criadas páginas próprias para Psicomotricidade e Fisioterapia.
- Criada página pesquisável de convênios em `/convenios/`.
- Atualizados links da home, hub, rodapés e navegação para as novas páginas.
- Removido o carregamento de dezenas de logos externos de convênios na home.
- Corrigido o consentimento: Elfsight só é injetado após autorização.
- Adicionada instrumentação de eventos pronta para GA4 quando houver Measurement ID.
- Corrigido o sitemap para listar apenas URLs indexáveis e incluídas as novas páginas.
- Criado `404.html` personalizado.
- Adicionada política de referrer nas principais páginas indexáveis e na Política de Privacidade.


## Equipe oficial (02/10/2026)

- Removidos os quatro perfis fictícios e as imagens externas do Random User.
- Inseridos sete profissionais com nomes, funções e registros fornecidos pela clínica.
- Seis fotos oficiais foram otimizadas para WebP e hospedadas localmente em `assets/equipe/`.
- Beatriz Mares permanece com um marcador neutro “Foto em breve” até o envio da fotografia oficial.
- A grade da equipe foi ajustada para sete cards com comportamento responsivo em desktop, tablet e celular.
