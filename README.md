# Boas-vindas ao repositório de exercícios Transactions API

<details>
  <summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary><br />

Testes unitários e de integração para uma API que gerencia transações financeiras de diferentes tipos. Vamos utilzar o _setup_ de testes composto pelas ferramentas Mocha, Chai e Sinon para testar os comportamentos de alguns _features_ da nossa API, levando em consideração, inclusive, se as rotas que iremos testar são protegidas ou não por autenticação.

</details>

# Orientações

> **Instruções para rodar a aplicação**

1. Instalar as dependências do exercício com `npm install`.
2. _Buildar_ o projeto com `npm run build`.
3. Subir os _containers_ definidos no `docker-compose` com o comando `docker-compose up -d --build`.
4. Abrir o terminal do _container_ criado (`docker exec -it transactions_api bash`).

> **De olho na dica 👀**: Em caso de erros com a alocação das portas 3001 (api) ou 3306 (banco), utilize os comandos abaixo:

```bash
killall node # parar instancias de processos node em execução!
docker stop $(docker ps -qa) # Para todos os containers que estiverem em execução!
```

</details>

## Exercícios

### Exercício 1

Crie testes de integração para a rota `/transactions`, do tipo `POST`.

**Atenção ⚠️**: Você deve se atentar para algumas especificações:

- Os testes devem ser desenvolvidos no arquivo `create.test.ts`, que já está criado no caminho `tests/integration/transactions/create.test.ts`.
- Os testes precisam atender os seguintes cenários:
  - Quando a requisição é feita com dados válidos:
    - Deve retornar um _status HTTP_ `201` com uma transação criada.
    - No `it`, o teste deve ter a descrição `deve retornar um status 201 com uma transação criada`.

  - Quando a requisição é feita com dados inválidos:
    - Ao enviar uma requisição com o atributo `name` presente, mas vazio, deve ser retornado um _status HTTP_ `400` com a mensagem `“Name is required”`.
    - No `it`, o teste deve ter a descrição `ao enviar um nome vazio deve retornar um status 400 com uma mensagem de erro`.

> **De olho na dica 👀:** Esse exercício possui mais camadas do que pode aparentar. Se tiver problemas, utilize o _status_ `http` que a requisição estiver retornando para entender o que está acontecendo!

<details>
  <summary>Sua aplicação está retornando `401` e isso está lhe travando? Veja esta dica!</summary>

Qual o significado do _status_ `401`? Ele significa `UNAUTHORIZED`. Seu teste não está criando uma transação porque você não está sendo autenticado! Lembre-se de que, para criar uma transação, a aplicação deve checar seu _token_, para garantir que ele é válido. Mas você não precisa fazer _login_ de verdade, é necessário apenas simular! No caso, não se esqueça de:

- Fazer a requisição com o _header_ no formato correto e contendo uma `token`.
- _Mockar_ as funções que seu _middleware_ de autenticação chama para fazer a checagem.

**De olho na dica 👀**: Se precisar de um lembrete da sintaxe para alguma dessas funções, faça uma pesquisa rápida.

</details>

### Exercício 2

Crie testes unitários para a função `create`, da camada _service_.

- Os testes devem ser desenvolvidos no arquivo `transactions.service.test.ts`, que já está criado no caminho `tests/unit/services/transactions.service.test.ts`.
- Os testes precisam atender os seguintes cenários:

  - Deve ser possível criar transações com sucesso.
    - No `it`, o teste deve ter a descrição: `deve ser possível criar uma transação com sucesso`.

  - Deve retornar um erro se um nome não for enviado.
    - A mensagem de erro deve ser: `"Name is required"` (com letra inicial maiúscula).
    - No `it`, o teste deve ter a descrição: `deve retornar um erro quando um nome não é enviado`.

### Exercício 3

Crie testes unitários para a função `create`, da camada _controller_.

- Os testes devem ser desenvolvidos no arquivo `transactions.controller.test.ts`, que já está criado no caminho `tests/unit/controllers/transactions.controller.test.ts`.

- Os testes precisam atender os seguintes cenários:
  - Deve ser possível criar transações com sucesso.

- No `it`, o teste deve ter a descrição: `deve salvar ao enviar dados válidos`.

  - Deve retornar um erro se um nome não for enviado.
    - A mensagem de erro deve ser: `"Name is required"` (com letra inicial maiúscula).
    - No `it`, o teste deve ter a descrição `deve retornar um erro se enviar um nome inválido`.

> **De olho na dica 👀:**
>
> 1. Confira a implementação dessa função antes de testá-la, para _mockar_ tudo que for necessário!
> 2. Lembre-se de que as funções do _controller_ são assíncronas.
