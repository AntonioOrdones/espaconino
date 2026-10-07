# Guia de manutenção

## Rotina recomendada

Antes de editar:

```bash
git checkout main
git pull
git checkout -b content/minha-alteracao
```

Durante a alteração, rode o site localmente e, antes do pull request:

```bash
python3 scripts/check_site.py
```

Se o SCSS mudar:

```bash
npx sass scss/main.scss css/main.css --style=compressed --no-source-map
```

## Atualizar a equipe

Arquivos envolvidos:

- `index.html`, seção `EQUIPE`;
- `assets/equipe/`.

Padrão de nome de foto:

```text
nome-sobrenome.webp
```

Ao adicionar ou trocar uma foto:

1. confirme nome, profissão e registro;
2. confirme autorização de uso da imagem;
3. converta para WebP;
4. reduza a imagem para o tamanho necessário ao site, evitando arquivos de vários megabytes;
5. mantenha a proporção vertical compatível com os cards;
6. use `alt` descritivo, sem descrever aparência física desnecessariamente;
7. atualize `width` e `height` no HTML para refletir a proporção do arquivo.

Não use fotografia gerada por IA para representar profissional real.

## Atualizar fotos do espaço

Arquivos:

- `index.html`, seção `GALERIA`;
- `assets/espaco/`.

Use nomes descritivos, por exemplo:

```text
recepcao.webp
ginasio-terapia-ocupacional.webp
sala-fonoaudiologia-psicopedagogia.webp
```

Atualize também `data-src`, `data-cap`, `alt`, `width` e `height`.

## Atualizar convênios

Existem duas representações:

1. a lista pesquisável na home, em `index.html`;
2. a lista pesquisável de `convenios/index.html`.

A home também possui o carrossel de logotipos, cujas imagens são externas.

Ao incluir ou remover um convênio:

- mantenha as duas listas textuais sincronizadas;
- atualize a contagem exibida;
- decida se o carrossel visual também precisa mudar;
- confirme o nome oficial com a clínica;
- não afirme cobertura integral. O texto atual orienta a confirmar contrato, guia e autorização.

## Atualizar um serviço

Para alterar um serviço existente, revise:

- página em `servicos/<slug>/index.html`;
- card/link correspondente na home;
- card/link em `servicos/index.html`;
- links de serviços relacionados;
- chatbot, se o assunto tiver resposta própria;
- `sitemap.xml`, quando a URL ou indexabilidade mudar.

Para criar um serviço:

1. copie a estrutura da página de serviço mais próxima;
2. crie `servicos/<slug>/index.html`;
3. escreva conteúdo próprio e aprovado;
4. crie `title`, meta description e H1 exclusivos;
5. ajuste canonical e Open Graph;
6. ajuste JSON-LD `Service` e `BreadcrumbList`;
7. adicione links na home e no hub;
8. adicione a URL ao sitemap;
9. rode `python3 scripts/check_site.py`.

Não crie páginas quase idênticas apenas para variar palavras-chave ou bairros.

## Atualizar telefone, endereço ou horário

Esses dados aparecem em mais de uma página e em mensagens do WhatsApp.

Faça uma busca global antes de alterar:

```bash
grep -Rni "99155" .
grep -Rni "Pau Brasil" .
grep -Rni "8h" .
```

Depois confira JSON-LD, rodapés, CTAs e mensagens pré-preenchidas.

## Atualizar SEO

Sempre que uma página pública mudar de objetivo:

- confira `title`;
- meta description;
- H1;
- canonical;
- Open Graph;
- JSON-LD;
- links internos;
- sitemap;
- texto local de Águas Claras/Brasília quando pertinente.

Detalhes em [SEO-ACCESSIBILITY.md](SEO-ACCESSIBILITY.md).

## Atualizar estilos

Edite somente `scss/main.scss` e compile.

Não mantenha correções diferentes em SCSS e CSS. Se um pull request altera o SCSS sem alterar o CSS compilado, ele está incompleto.

## Atualizar JavaScript

As configurações públicas ficam no início de `js/main.js`:

- número de WhatsApp;
- `GA4_ID`.

O arquivo é compartilhado por várias páginas. Sempre teste home, convênios e pelo menos uma página de serviço após uma mudança.

## Configurações ainda pendentes

### GA4

`GA4_ID` está vazio. Quando houver propriedade aprovada, use o Measurement ID público no formato `G-XXXXXXXXXX`.

Nunca coloque credenciais do Google no JavaScript.

### CNPJ e razão social

A Política de Privacidade ainda possui marcador de pendência. O rodapé também precisa receber o dado institucional quando confirmado.

### DPO/encarregado

`privacidade.html` e `lgpd.html` ainda aguardam nome/e-mail definidos pela clínica.

### Boletim

O formulário `#form-boletim` possui `data-endpoint=""`. Sem endpoint, o fluxo usa WhatsApp.

## Antes de excluir um arquivo

Pesquise referências no repositório e confirme que nenhuma página pública depende dele. URLs publicadas podem continuar sendo acessadas por buscadores, favoritos ou links antigos.

Use o checklist em [RELEASE-CHECKLIST.md](RELEASE-CHECKLIST.md).
