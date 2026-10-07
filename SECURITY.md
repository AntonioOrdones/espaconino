# Política de segurança

## Escopo

A versão suportada é a versão publicada a partir da branch `main`.

O site é estático e não possui backend ou banco de dados neste repositório, mas ainda pode ser afetado por problemas de segurança em links, scripts de terceiros, dependências externas, configuração de domínio e publicação de informações indevidas.

## Como reportar uma vulnerabilidade

Não publique detalhes de exploração em uma issue pública.

Quando o recurso estiver habilitado, prefira o **Private vulnerability reporting** do GitHub na área Security do repositório. Caso ele não esteja disponível, entre em contato de forma privada com a pessoa responsável pelo repositório antes de divulgar detalhes.

Inclua, quando possível:

- página ou arquivo afetado;
- passos para reproduzir;
- impacto observado;
- evidências sem dados pessoais;
- sugestão de correção, se houver.

## Informações que nunca devem entrar no repositório

- senhas;
- tokens de API;
- chaves privadas;
- cookies de sessão;
- credenciais de contas Google, Elfsight ou redes sociais;
- dados de pacientes;
- prontuários;
- documentos pessoais;
- informações de saúde identificáveis.

IDs públicos de widgets, números de telefone e Measurement IDs do GA4 não são segredos, mas ainda devem ser alterados somente por pessoas autorizadas.
