# API Sistema Financeiro em Typescript

```shell
Estrutura padrão da API:

.
├───src
│   └───server
│       ├───controllers
│       │   └───example
│       ├───database
│       │   ├───knex
│       │   │   └───@types
│       │   ├───migrations
│       │   ├───models
│       │   ├───providers
│       │   │   └───example
│       │   └───seeds
│       ├───routes
│       └───shared
│           ├───middleware
│           └───services
└───tests
    └───example
```

### Para começar:
~~~javascript
npm install && npm start
~~~

### Como iniciar o projeto:
* Configurar o `.env`

* Configurar as variáveis de desenvolvimento em __`src/server/database/knex/Environment.ts`__

### Como criar uma tabela:
* Adicionar o nome da tabela em __`src/server/database/ETableNames.ts`__ *(onde o nome da tabela é no plural tanto na chave quanto no valor)*

* Criar o Model para a tabela em __`src/server/database/models/[nome_da_tabela_no_singular].ts`__

* Adicionar o Model da tabela em __`src/server/database/knex/@types/knex.d.ts`__ *(onde o nome da tabela é no singular)*

* Criar a Migration para a tabela em __`src/server/database/migrations/[xxxx_create_nome_da_tabela_no_plural].ts`__

* Criar a Seed para a tabela em __`src/server/database/seeds/[xxxx_insert_nome_da_tabela_no_plural].ts`__

* Criar os Providers para os métodos que serão utilizados posteriormente nos Controllers em __`src/server/database/providers/[nome_da_tabela_no_plural]`__

### Como implementar um endpoint:
* Criar as Rotas em __`src/server/routes`__

* Criar os Controllers em __`src/server/controllers/[nome_da_tabela_no_plural].ts`__

### Como criar um teste:
* Criar a pasta do teste em __`tests/[nome_do_controller]`__

* Criar o arquivo de teste `[método_do_controller].test.ts`