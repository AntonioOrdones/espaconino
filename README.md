# Espaço Niño | site institucional

Site institucional do **Espaço Niño, Centro de Terapias Multiprofissionais**, em Águas Claras, Brasília/DF.

**Produção:** https://antonioordones.github.io/espaconino/

Este repositório contém um site estático em HTML5, Sass/CSS e JavaScript puro. Não há framework de front-end, backend ou banco de dados no projeto publicado.

## Comece por aqui

Para manutenção do site, use estes documentos:

- [Documentação do projeto](docs/README.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Guia de manutenção](docs/MAINTENANCE.md)
- [Publicação e rollback](docs/DEPLOYMENT.md)
- [SEO e acessibilidade](docs/SEO-ACCESSIBILITY.md)
- [Privacidade e integrações](docs/PRIVACY-INTEGRATIONS.md)
- [Guia de conteúdo](docs/CONTENT-GUIDE.md)
- [Checklist de publicação](docs/RELEASE-CHECKLIST.md)
- [Como contribuir](CONTRIBUTING.md)
- [Histórico de mudanças](CHANGELOG.md)

## Estrutura do repositório

```text
espaconino/
├── index.html
├── 404.html
├── acessibilidade.html
├── lgpd.html
├── privacidade.html
├── termos.html
├── convenios/
│   └── index.html
├── servicos/
│   ├── index.html
│   ├── avaliacao-inicial/
│   ├── fisioterapia/
│   ├── fonoaudiologia/
│   ├── psicologia-infantil/
│   ├── psicomotricidade/
│   ├── psicopedagogia/
│   └── terapia-ocupacional/
├── assets/
│   ├── equipe/
│   └── espaco/
├── scss/
│   └── main.scss
├── css/
│   └── main.css
├── js/
│   └── main.js
├── scripts/
│   └── check_site.py
├── docs/
├── .github/
├── sitemap.xml
└── robots.txt
```

### Arquivos que são fonte de verdade

- **Estilos:** edite `scss/main.scss`. O arquivo `css/main.css` é o CSS compilado que vai para produção.
- **Comportamentos:** edite `js/main.js`.
- **Conteúdo da home:** edite `index.html`.
- **Páginas de serviços:** edite os arquivos `servicos/*/index.html`.
- **Convênios:** a lista pesquisável existe na home e em `convenios/index.html`. A home também contém o carrossel visual de logotipos.
- **Imagens da equipe e do espaço:** ficam em `assets/equipe/` e `assets/espaco/`.

## Desenvolvimento local

O site pode ser servido por qualquer servidor HTTP simples.

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

Para editar estilos:

```bash
npx sass scss/main.scss css/main.css --style=compressed --no-source-map
```

Durante o trabalho:

```bash
npx sass --watch scss/main.scss:css/main.css --style=compressed --no-source-map
```

Antes de enviar uma alteração:

```bash
python3 scripts/check_site.py
```

O mesmo verificador roda automaticamente no GitHub Actions em pushes e pull requests.

## Regras de manutenção

1. Não edite `css/main.css` manualmente. Altere o SCSS e gere o CSS novamente.
2. Não coloque senhas, tokens, chaves privadas ou dados pessoais de pacientes no repositório.
3. Preserve URLs públicas já indexadas. Mudanças de rota precisam de avaliação de SEO e redirecionamento quando houver infraestrutura para isso.
4. Ao criar ou alterar uma página indexável, revise `title`, meta description, canonical, Open Graph, JSON-LD, links internos e `sitemap.xml`.
5. Fotos devem ter autorização de uso, nome de arquivo descritivo, texto alternativo adequado e tamanho otimizado.
6. Dados profissionais, registros e informações clínicas devem vir de fonte aprovada pela clínica.
7. Mudanças na `main` são mudanças de produção. Para trabalho em equipe, prefira branch e pull request.

## Funcionalidades atuais

- home institucional responsiva;
- páginas próprias para sete áreas/serviços e uma página-hub;
- página própria de convênios;
- equipe multiprofissional com oito profissionais e fotos locais;
- galeria com fotos reais do espaço e lightbox;
- avaliações do Google e feed do Instagram via Elfsight;
- WhatsApp, mapa sob demanda e chatbot Nino;
- recursos de acessibilidade, alto contraste, ajuste de fonte, movimento reduzido e VLibras;
- políticas de Privacidade, LGPD, Termos de Uso e Acessibilidade;
- sitemap, robots, canonicals, Open Graph e dados estruturados;
- instrumentação de eventos pronta para GA4.

O blog foi retirado do projeto e não faz mais parte da arquitetura atual.

## Configurações e pendências externas

Alguns itens não podem ser concluídos apenas no código:

- `GA4_ID` em `js/main.js` está vazio até a criação/configuração da propriedade Google Analytics;
- CNPJ/razão social ainda precisam ser informados na Política de Privacidade e no rodapé;
- nome e e-mail do encarregado de dados/DPO ainda precisam ser definidos;
- o formulário de boletim não possui endpoint de e-mail configurado e usa WhatsApp como fallback;
- Search Console, Google Business Profile e painéis do Elfsight dependem das respectivas contas externas;
- um domínio próprio, se adotado, exige atualizar canonicals, Open Graph, JSON-LD, sitemap e robots.

Veja os detalhes em [Privacidade e integrações](docs/PRIVACY-INTEGRATIONS.md) e [Guia de manutenção](docs/MAINTENANCE.md).

## Publicação

A produção usa GitHub Pages a partir da branch `main`. O fluxo completo, incluindo verificação do deploy, cache e rollback, está em [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Licenciamento

O repositório não possui licença de software definida. Não adicione uma licença sem decisão dos responsáveis pelo projeto.
