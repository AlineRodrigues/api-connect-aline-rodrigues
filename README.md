# API Connect

## 1. Sobre o projeto

A **API Connect** é uma API REST desenvolvida como Produto Mínimo Viável (MVP), com o objetivo de disponibilizar operações de cadastro, consulta, atualização e remoção de usuários por meio de requisições HTTP.

O projeto foi estruturado de forma modular, utilizando separação de responsabilidades entre o servidor, as rotas, os controladores e a camada de persistência provisória.

A solução foi desenvolvida para atender às etapas propostas na experiência prática de desenvolvimento back-end, contemplando configuração do ambiente, inicialização do servidor, organização de diretórios, implementação das operações CRUD, validações e testes dos endpoints.

---

## 2. Objetivos

O projeto tem como principais objetivos:

- Configurar um ambiente de desenvolvimento back-end.
- Criar e inicializar um servidor HTTP.
- Implementar o middleware para interpretação de requisições JSON.
- Organizar o projeto de maneira modular.
- Implementar as operações CRUD de usuários.
- Utilizar códigos de status HTTP adequados.
- Validar os dados recebidos nas operações de cadastro e atualização.
- Simular a persistência dos dados utilizando um array em memória.
- Disponibilizar uma documentação técnica do projeto.

---

## 3. Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript no back-end.
- **Express** — microframework utilizado para criação do servidor e das rotas HTTP.
- **JavaScript** — linguagem utilizada na implementação da API.
- **Git** — sistema de controle de versão.
- **GitHub** — plataforma utilizada para hospedagem do código-fonte.
- **Postman** — ferramenta utilizada para testes das requisições HTTP.

---

## 4. Estrutura do projeto

```text
api-connect/
├── .gitignore
├── package.json
├── README.md
├── server.js
└── src/
    ├── controllers/
    │   └── connectController.js
    ├── data/
    │   └── users.js
    └── routes/
        └── userRoutes.js
```

### Responsabilidades dos arquivos e diretórios

#### `server.js`

É o ponto de entrada da aplicação. Responsável por importar o Express, criar a aplicação, configurar o middleware `express.json()`, registrar as rotas e iniciar o servidor na porta 3000.

#### `src/routes/`

Diretório responsável pela definição das rotas HTTP da API. As rotas recebem as requisições e direcionam cada operação para o controlador correspondente.

#### `src/routes/userRoutes.js`

Define os endpoints relacionados aos usuários e associa cada método HTTP ao respectivo controlador.

#### `src/controllers/`

Diretório responsável pela lógica das operações da aplicação.

#### `src/controllers/connectController.js`

Contém a implementação das operações CRUD, validações dos dados recebidos, busca de usuários e tratamento dos cenários de sucesso e erro.

#### `src/data/`

Diretório destinado à camada de persistência provisória da aplicação.

#### `src/data/users.js`

Mantém os usuários em um array na memória e disponibiliza a função responsável pela geração de IDs incrementais.

#### `package.json`

Arquivo de configuração do projeto Node.js. Contém as informações da aplicação, dependências e script utilizado para iniciar o servidor.

#### `.gitignore`

Define arquivos e diretórios que não devem ser enviados para o repositório Git, como `node_modules` e arquivos de configuração que possam conter informações sensíveis.

---

## 5. Persistência dos dados

Nesta versão do MVP, não foi utilizado um banco de dados real.

A persistência é simulada por meio de um **array em memória**, localizado no arquivo:

```text
src/data/users.js
```

Os usuários permanecem disponíveis enquanto o servidor estiver em execução.

A geração dos identificadores é realizada por meio de um contador incremental. A cada novo cadastro, um novo ID é gerado.

Como os dados ficam somente na memória RAM, eles são perdidos quando o servidor é encerrado ou reiniciado.

Essa abordagem foi adotada por ser adequada para um MVP e permitir o desenvolvimento das funcionalidades da API sem a necessidade de configurar inicialmente um banco de dados.

---

## 6. Instalação

### Pré-requisitos

É necessário possuir o **Node.js** instalado no computador.

Após clonar ou baixar o projeto, abra o terminal dentro da pasta `api-connect`.

Instale as dependências com:

```bash
npm install
```

---

## 7. Execução da aplicação

Para iniciar o servidor:

```bash
npm start
```

Quando a aplicação estiver funcionando corretamente, será exibida uma mensagem semelhante a:

```text
Servidor rodando na porta 3000
```

A API estará disponível em:

```text
http://localhost:3000
```

---

## 8. Endpoints

A API disponibiliza os seguintes endpoints:

| Método | Endpoint | Descrição | Sucesso |
|---|---|---|---|
| POST | `/users` | Cadastra um usuário | 201 Created |
| GET | `/users` | Lista todos os usuários | 200 OK |
| GET | `/users/:id` | Busca um usuário pelo ID | 200 OK |
| PUT | `/users/:id` | Atualiza um usuário | 200 OK |
| DELETE | `/users/:id` | Remove um usuário | 204 No Content |

---

# 9. Exemplos de utilização

## 9.1 Cadastro de usuário

### Requisição

```http
POST http://localhost:3000/users
```

No Postman, selecione:

```text
Body → raw → JSON
```

Envie:

```json
{
  "nome": "Aline Rodrigues",
  "email": "aline@example.com"
}
```

### Resposta esperada

Status:

```text
201 Created
```

Resposta:

```json
{
  "data": {
    "id": 1,
    "nome": "Aline Rodrigues",
    "email": "aline@example.com"
  }
}
```

---

## 9.2 Falha de validação no cadastro

A API exige os campos `nome` e `email`.

### Requisição

```http
POST http://localhost:3000/users
```

Body:

```json
{
  "nome": "Aline Rodrigues"
}
```

### Resposta esperada

Status:

```text
400 Bad Request
```

Resposta:

```json
{
  "error": "Os campos nome e email são obrigatórios."
}
```

---

## 9.3 Listagem de usuários

### Requisição

```http
GET http://localhost:3000/users
```

### Resposta esperada

Status:

```text
200 OK
```

Resposta:

```json
{
  "data": [
    {
      "id": 1,
      "nome": "Aline Rodrigues",
      "email": "aline@example.com"
    }
  ]
}
```

---

## 9.4 Busca de usuário por ID

### Requisição

```http
GET http://localhost:3000/users/1
```

### Resposta esperada

Status:

```text
200 OK
```

Resposta:

```json
{
  "data": {
    "id": 1,
    "nome": "Aline Rodrigues",
    "email": "aline@example.com"
  }
}
```

---

## 9.5 Busca de usuário inexistente

Quando o ID informado não existir na estrutura de persistência, a API retorna um erro.

### Requisição

```http
GET http://localhost:3000/users/999
```

### Resposta esperada

Status:

```text
404 Not Found
```

Resposta:

```json
{
  "error": "Usuário não encontrado."
}
```

---

## 9.6 Atualização de usuário

### Requisição

```http
PUT http://localhost:3000/users/1
```

Body:

```json
{
  "nome": "Aline Rodrigues Atualizada",
  "email": "aline.atualizada@example.com"
}
```

### Resposta esperada

Status:

```text
200 OK
```

Resposta:

```json
{
  "data": {
    "id": 1,
    "nome": "Aline Rodrigues Atualizada",
    "email": "aline.atualizada@example.com"
  }
}
```

Caso o usuário não exista, a API retorna:

```text
404 Not Found
```

Caso `nome` ou `email` não sejam informados:

```text
400 Bad Request
```

---

## 9.7 Remoção de usuário

### Requisição

```http
DELETE http://localhost:3000/users/1
```

### Resposta esperada

Status:

```text
204 No Content
```

A resposta não possui conteúdo, pois o endpoint utiliza o status `204`.

Caso o usuário não exista:

```text
404 Not Found
```

Resposta:

```json
{
  "error": "Usuário não encontrado."
}
```

---

# 10. Códigos de status HTTP

A API utiliza códigos de status HTTP de acordo com o resultado de cada operação:

| Código | Significado | Utilização |
|---|---|---|
| 200 | OK | Operações realizadas com sucesso |
| 201 | Created | Cadastro realizado com sucesso |
| 204 | No Content | Exclusão realizada com sucesso |
| 400 | Bad Request | Dados obrigatórios ausentes ou requisição inválida |
| 404 | Not Found | Usuário não encontrado |

---

# 11. Testes com Postman

Os endpoints foram testados utilizando o Postman como cliente HTTP.

Os principais cenários de teste são:

### Teste 1 — Criação com sucesso

```text
POST /users
```

Payload:

```json
{
  "nome": "Aline Rodrigues",
  "email": "aline@example.com"
}
```

Resultado esperado:

```text
201 Created
```

### Teste 2 — Falha na criação

```text
POST /users
```

Payload sem o campo `email`:

```json
{
  "nome": "Aline Rodrigues"
}
```

Resultado esperado:

```text
400 Bad Request
```

### Teste 3 — Listagem geral

```text
GET /users
```

Resultado esperado:

```text
200 OK
```

### Teste 4 — Busca de usuário inexistente

```text
GET /users/999
```

Resultado esperado:

```text
404 Not Found
```

Também podem ser realizados testes adicionais para atualização e remoção dos usuários.

---

# 12. Git e GitHub

O projeto utiliza Git para controle de versão e GitHub para hospedagem do código-fonte.

Para inicializar o controle de versão localmente:

```bash
git init
```

Adicionar os arquivos:

```bash
git add .
```

Criar o primeiro commit:

```bash
git commit -m "Estrutura inicial da API Connect"
```

Adicionar o repositório remoto:

```bash
git remote add origin https://github.com/SEU_USUARIO/api-connect-aline-rodrigues.git
```

Definir a branch principal:

```bash
git branch -M main
```

Enviar os arquivos para o GitHub:

```bash
git push -u origin main
```

---

# 13. Controle de arquivos

O arquivo `.gitignore` impede que dependências locais e arquivos que não devem fazer parte do repositório sejam versionados.

Exemplo:

```gitignore
node_modules/
.env
npm-debug.log*
```

A pasta `node_modules` não precisa ser enviada ao GitHub, pois pode ser recriada executando:

```bash
npm install
```

---

# 14. Arquitetura e separação de responsabilidades

A aplicação segue o princípio de **Separação de Responsabilidades (Separation of Concerns)**.

A divisão adotada permite que cada parte do sistema tenha uma função específica:

```text
Cliente HTTP
     |
     v
Rotas
     |
     v
Controladores
     |
     v
Persistência em memória
```

Essa organização facilita a manutenção do projeto e permite que a solução evolua futuramente.

Por exemplo, a persistência em memória poderá ser substituída por um banco de dados real sem que toda a estrutura das rotas precise ser modificada.

---

# 15. Possíveis evoluções

Como evolução futura do projeto, podem ser implementados:

- Banco de dados real.
- Validações mais completas dos campos.
- Criptografia e autenticação de usuários.
- Testes automatizados.
- Documentação com Swagger/OpenAPI.
- Variáveis de ambiente.
- Tratamento global de erros.
- Paginação da listagem.
- Filtros e buscas avançadas.
- Deploy da API em ambiente de nuvem.

---

# 16. Conclusão

A API Connect apresenta uma estrutura inicial de back-end organizada e modular, contemplando a configuração do ambiente, criação do servidor HTTP, interpretação de JSON, organização das responsabilidades, persistência provisória e implementação das operações CRUD.
A utilização de rotas, controladores e uma camada específica para os dados proporciona uma base adequada para a evolução do MVP.
Os endpoints foram preparados para receber requisições HTTP e retornar respostas JSON padronizadas, utilizando códigos de status apropriados para situações de sucesso e erro.
