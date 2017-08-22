# GITindex
## Descrição
  Uma aplicação client-side que consulte informações sobre um dado usuário do GIT-HUB.
  
## Objetivo
  * Pesquisar pelo nome de um usuário do GitHub e acessar informações básicas (BIO, E-mail, etc...)
  * Ter uma listagem de repositórios.
  * Poder consultar detalhes destes repositórios
  
## Inspiração
  [Desafio Front-End da Concrete Solutions](https://github.com/concretesolutions/recrutamento-fe)

## Recursos da API 
  [API do GITHUB](https://developer.github.com/v3/)
  
  A API aceita requisições apartir do  `https://api.github.com/`. Por meio `https://api.github.com/search/users?q=>` podem ser    feitas pesquisas por usuários, sendo retornado um JSON com no máximo    30 resultados para login ou nome dos usuários semelhantes ao requisitado. Com `https://api.github.com/users/_USERNAME_`, é possível acessar informações sobre um dado usuário, com `https://api.github.com/users/_USERNAME_/repos` uma listagem de seus repositórios. 
  
  
