# Privacidade e integrações

## Visão geral

O site é estático. Ele não possui banco de dados próprio e não envia formulários para um backend do Espaço Niño.

Mesmo assim, há integrações com serviços externos que podem receber dados técnicos do navegador, como endereço IP, user agent e informações de navegação.

## WhatsApp

Formulários e CTAs montam mensagens no navegador e abrem o WhatsApp.

O repositório não armazena o conteúdo dessas mensagens.

O número público usado pelo site fica em `js/main.js` e também aparece em links HTML. Se ele mudar, faça busca global.

## Preferências locais

Preferências de acessibilidade e cookies são gravadas no `localStorage` do navegador.

Não armazene nesse mecanismo dados clínicos, nome de paciente, e-mail de paciente ou informação sensível.

## Elfsight

A home usa Elfsight para:

- avaliações do Google;
- feed do Instagram.

### Comportamento atual

O `platform.js` do Elfsight é carregado diretamente por `index.html`. A preferência de cookies controla a visibilidade das seções, mas o carregamento inicial do script de terceiros acontece antes dessa escolha.

Isso significa que o mecanismo atual **não implementa bloqueio prévio de rede** para Elfsight.

Se a revisão jurídica exigir consentimento prévio estrito, a implementação recomendada é:

1. remover o `<script src="https://elfsightcdn.com/platform.js">` fixo da home;
2. usar a função de carregamento existente em `js/main.js`;
3. chamar o carregamento apenas após escolha explícita por conteúdo de terceiros;
4. manter fallback visual quando a integração não for carregada;
5. revisar o texto da Política de Privacidade.

Não altere essa estratégia sem testar novamente os painéis de avaliações e Instagram.

## Google Analytics 4

`GA4_ID` está vazio em `js/main.js`. Portanto, GA4 não deve ser considerado configurado.

Quando houver um Measurement ID aprovado, ele pode ser preenchido no front-end. O Measurement ID não é uma credencial secreta.

Não coloque chaves de API, senhas ou tokens do Google no site.

## Google Maps

O mapa foi desenhado para carregamento sob demanda. Isso reduz requisições externas antes da interação.

Links para Google Maps podem abrir o serviço externo diretamente.

## VLibras

O VLibras é carregado como recurso de acessibilidade. Ele é um serviço externo e deve ser mencionado na documentação de privacidade quando aplicável.

## Google Fonts

As fontes web são carregadas de domínios do Google. Se a política de privacidade exigir redução de chamadas externas, considere hospedar localmente fontes com licença compatível.

## Logotipos de convênios

O carrossel visual da home usa imagens hospedadas por sites de terceiros.

Riscos de manutenção:

- a URL externa pode mudar;
- o servidor pode bloquear hotlink;
- a imagem pode ser substituída;
- há requisição para domínio de terceiro.

O código possui fallback textual quando uma imagem falha. Para maior controle, a equipe pode futuramente hospedar localmente apenas logotipos cujo uso esteja autorizado.

## Elfsight e IDs públicos

Os IDs de widgets presentes no HTML são identificadores públicos necessários ao embed. Eles não devem ser tratados como segredo.

## Pendências jurídicas/institucionais

Ainda faltam dados confirmados para:

- CNPJ e razão social;
- nome e e-mail do encarregado/DPO.

Esses dados aparecem como `TODO` em páginas legais para impedir que a equipe publique informação inventada.

## Regra para novas integrações

Antes de adicionar um novo script de terceiro, registre:

1. finalidade;
2. quais dados podem ser enviados;
3. quando o script carrega;
4. se exige consentimento;
5. política de privacidade do fornecedor;
6. fallback quando o serviço falha;
7. responsável pela conta externa.
