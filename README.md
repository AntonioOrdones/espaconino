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
- **Widgets de terceiros são opt‑in:** avaliações do Google e feed do Instagram
  (Elfsight) só carregam após “Aceitar todos” no aviso de cookies ou “Ativar”
  no próprio painel. O mapa continua click‑to‑load. O VLibras (gov.br) carrega
  sempre, por ser recurso público de acessibilidade.

## Recursos implementados

Equipe (cards com registro e redes) · galeria com lightbox (fotos + vídeo) ·
muro com os 51 logos de convênios (marquee sem cartões, altura uniforme de
54 px, tons de cinza → cor no hover, fallback tipográfico se algum logo cair) · busca de convênios ·
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
- [ ] **Logos de convênios:** hoje vêm dos sites das operadoras (como no v85).
      Recomendado: baixar os arquivos para `assets/convenios/` e trocar os
      `src` do `.logo-wall` para caminhos locais.
- [ ] **Elfsight:** os widgets usam os IDs oficiais já fornecidos — basta manter
      os apps ativos no painel da Elfsight.
