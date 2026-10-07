# Como contribuir

Este documento descreve o fluxo recomendado para manter o site do Espaço Niño com segurança e previsibilidade.

## Fluxo de trabalho

1. Atualize sua cópia da `main`.
2. Crie uma branch curta e descritiva.
3. Faça uma alteração por objetivo.
4. Teste localmente.
5. Rode `python3 scripts/check_site.py`.
6. Se houver mudança em `scss/main.scss`, gere também `css/main.css`.
7. Abra um pull request.
8. Revise o deploy após o merge.

Sugestões de nomes de branch:

- `feat/nova-secao`
- `fix/menu-mobile`
- `content/equipe`
- `seo/metadata-fono`
- `docs/guia-deploy`
- `chore/limpeza-assets`

## Commits

Prefira mensagens curtas, no imperativo e com um objetivo claro.

Exemplos:

```text
feat: adiciona seção de avaliação neuropsicológica
fix: corrige link do WhatsApp em psicologia
content: atualiza registro profissional da equipe
docs: atualiza instruções de publicação
chore: remove arquivos não utilizados
```

## Regras para conteúdo de saúde

- Não invente credenciais, títulos, registros, convênios, abordagens ou alegações clínicas.
- Não publique promessa de resultado, garantia de tratamento ou linguagem que possa induzir expectativa clínica indevida.
- Dados de profissionais devem ser conferidos com a clínica antes da publicação.
- Não inclua dados pessoais de pacientes, prontuários ou informações sensíveis no código, issues ou pull requests.
- Depoimentos e imagens precisam ter autorização de uso.

Veja também [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md).

## Regras para HTML

- mantenha um único H1 por página;
- use HTML semântico;
- preserve labels, textos alternativos, foco de teclado e skip link;
- links externos que abrem nova aba devem usar `rel="noopener"`;
- não remova canonical, meta description, Open Graph ou JSON-LD de páginas indexáveis sem motivo documentado.

## Regras para CSS/SCSS

O arquivo fonte é `scss/main.scss`.

Não faça correções diretamente em `css/main.css`. Gere o arquivo compilado:

```bash
npx sass scss/main.scss css/main.css --style=compressed --no-source-map
```

O projeto usa classes descritivas e, em vários componentes, uma convenção próxima de BEM, como `.team-card__photo` e `.service-card__body`. Mantenha o padrão existente.

## Regras para JavaScript

- use JavaScript nativo, sem introduzir framework para uma alteração pontual;
- mantenha o código compatível com o modelo atual de script único;
- evite variáveis globais;
- trate ausência de elementos opcionais sem quebrar outras páginas;
- não coloque segredos em constantes do front-end;
- preserve suporte a `prefers-reduced-motion` e navegação por teclado.

## Pull requests

O pull request deve informar:

- o que mudou;
- por que mudou;
- páginas afetadas;
- como foi testado;
- se houve alteração de conteúdo clínico ou institucional;
- se houve alteração de SEO, acessibilidade, privacidade ou integração externa.

Use o checklist automático em `.github/PULL_REQUEST_TEMPLATE.md`.

## Mudanças que exigem atenção extra

- telefone, endereço, horário e dados institucionais;
- profissionais e registros;
- lista de convênios;
- URLs públicas;
- `sitemap.xml` e `robots.txt`;
- scripts de terceiros;
- políticas legais;
- consentimento e analytics;
- exclusão ou renomeação de arquivos publicados.
