# Espaço Niño — Site institucional

Site do **Espaço Niño · Centro de Terapias Multiprofissionais** (Águas Claras,
Brasília‑DF), construído com HTML5, Sass/CSS e JavaScript puro — sem frameworks
e sem dependências em tempo de execução.

---

## Estrutura

```
espaco-nino/
├── index.html               ← página principal
├── privacidade.html         ← Política de Privacidade
├── termos.html              ← Termos de Uso
├── lgpd.html                ← Canal LGPD
├── acessibilidade.html      ← Declaração de Acessibilidade
├── scss/main.scss           ← fonte dos estilos (editar aqui)
├── css/main.css             ← compilado (não editar à mão)
├── js/main.js               ← todos os comportamentos
└── assets/                  ← logos oficiais, favicon, QR do WhatsApp
```

**`espaco-nino-standalone.html`** (fora da pasta) é a home em arquivo único
(CSS/JS/imagens embutidos) para testes rápidos — os links das páginas legais
só funcionam na versão completa.

## Estilos

```bash
npm install -g sass                                   # uma vez
sass scss/main.scss css/main.css --style=compressed --no-source-map
sass --watch scss/main.scss css/main.css              # durante o trabalho
```

### Tipografia da marca
- **Garet** é a primeira opção da pilha (`--font-sans`). O site já declara
  `@font-face` com `local()` — quem tiver a fonte instalada a verá. Para servir
  a fonte no site: coloque `Garet-Book.woff2` e `Garet-Heavy.woff2` em
  `assets/fonts/` e descomente as linhas `url()` no bloco 23 do SCSS.
  Sem ela, o fallback é a Plus Jakarta Sans (geometria muito próxima).
- **Big Shoulders Display** (2ª fonte da marca, via Google Fonts) aparece com
  moderação: eyebrows, marquee, numeração das etapas e títulos do rodapé.
- Fraunces segue como serifada de display dos títulos grandes.

## Privacidade e consentimento (LGPD)

- O site **não coleta nem armazena dados**: formulários montam a mensagem e
  abrem o WhatsApp.
- Preferências (cookies, contraste, tamanho de fonte) ficam no `localStorage`
  do visitante.
- **Widgets de terceiros:** avaliações do Google e feed do Instagram (Elfsight)
  só são carregados depois que o visitante autoriza conteúdo de terceiros.
  Quem mantiver apenas o essencial não faz a chamada ao Elfsight. A preferência
  pode ser revista pelo botão “Cookies” do rodapé. O mapa continua click-to-load;
  o VLibras (gov.br) carrega sempre, por ser recurso público de acessibilidade.

## Recursos implementados

Equipe (cards com registro e redes) · galeria com lightbox (fotos + vídeo) ·
consulta pesquisável de 51 convênios em HTML, sem carregar dezenas de logos externos ·
chatbot **Nino** (roteiro local: especialidades, convênio, endereço, horários,
valores, agendamento em 2 passos → WhatsApp) · feedback via diálogo → WhatsApp ·
boletim (aponte `data-endpoint` do `#form-boletim` para Mailchimp/Brevo; sem
endpoint, o pedido chega por WhatsApp) · Trabalhe conosco · botão voltar ao topo ·
A−/A+/alto contraste · VLibras · aviso de cookies sem dark pattern.

## Como testar direito

Os plugins externos — **VLibras** e **Elfsight** — exigem origem `http(s)` e
não iniciam abrindo o arquivo direto do disco (`file://`). Para testar tudo:

```bash
cd espaco-nino && python3 -m http.server 8080   # depois abra http://localhost:8080
```

(ou `npx serve`, ou publique num host). O restante do site funciona até em `file://`.

## Pendências antes de publicar

- [ ] **Equipe:** substituir os 4 perfis fictícios (comentário `EXEMPLO` no HTML)
      por nome, foto, registro e redes reais.
- [ ] **Galeria:** trocar fotos/vídeo ilustrativos (comentário `SUBSTITUIR`)
      por registros reais do espaço.
- [ ] **Blog:** confirmar a URL do Blogger (busque `TODO` no `index.html`).
- [ ] **Boletim:** configurar o provedor de e‑mail em `data-endpoint`.
- [ ] **CNPJ** no rodapé e na Política de Privacidade; **e‑mail do DPO** nas
      páginas de Privacidade e LGPD.
- [x] **Convênios:** a home deixou de carregar dezenas de logos externos;
      a consulta textual permanece e ganhou página própria em `/convenios/`.
- [ ] **Elfsight:** os widgets usam os IDs oficiais já fornecidos — basta manter
      os apps ativos no painel da Elfsight.


## Arquitetura de serviços e SEO local (30/09/2026)

Foram adicionadas páginas HTML indexáveis e com conteúdo próprio para:

- `/servicos/avaliacao-inicial/`
- `/servicos/terapia-ocupacional/`
- `/servicos/fonoaudiologia/`
- `/servicos/psicologia-infantil/`
- `/servicos/psicopedagogia/`
- `/servicos/psicomotricidade/`
- `/servicos/fisioterapia/`
- `/servicos/` como página-hub.
- `/convenios/` como página pesquisável de convênios e orientações.

Cada página possui `title`, `meta description`, canonical, Open Graph, links internos,
breadcrumbs e dados estruturados `Service` + `BreadcrumbList`. A home passou a apontar
para essas páginas em links HTML rastreáveis; também foram incluídos `sitemap.xml` e
`robots.txt`.

### URL canônica usada

O repositório está com GitHub Pages habilitado e não possui `CNAME`; por isso, os
canonicals e o sitemap foram configurados para:

`https://antonioordones.github.io/espaconino/`

Se o site passar a usar domínio próprio, substitua esse prefixo nos HTMLs e em
`sitemap.xml`/`robots.txt` antes da publicação. Em GitHub Pages de projeto, o arquivo
`robots.txt` fica em `/espaconino/robots.txt`; para controle de rastreamento no nível
do host, prefira domínio próprio ou uma configuração em que `robots.txt` seja servido
na raiz do domínio.

### Observação sobre a tecnologia

O código atual deste repositório é HTML5 + Sass/CSS + JavaScript puro. Não há arquivos
React nem etapa de build React no conteúdo atualmente versionado.


## Privacidade, medição e robustez (30/09/2026)

- Elfsight (Google Reviews e Instagram) não é mais carregado antes da escolha do visitante. O script é injetado somente após consentimento.
- Foi adicionada instrumentação para os eventos `click_whatsapp`, `click_phone`, `click_map`, `service_cta_click`, `insurance_search`, `form_start`, `form_submit` e `generate_lead`.
- Para ativar GA4, preencha `GA4_ID` no início de `js/main.js` com o Measurement ID da propriedade (`G-...`). Sem ID, nenhum script do Google Analytics é carregado.
- Foi criado `404.html` para URLs inexistentes no GitHub Pages.
- O sitemap contém apenas URLs indexáveis/canônicas; páginas legais marcadas como `noindex` foram retiradas.
- A home não carrega mais dezenas de logotipos de convênios hospedados por terceiros.
