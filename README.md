# API Connect

MVP de uma API REST desenvolvida com Node.js e Express.

## Estrutura
- `server.js`: ponto de entrada e inicialização do servidor.
- `src/routes/`: definição das rotas HTTP.
- `src/controllers/`: lógica das operações CRUD.
- `src/data/`: persistência provisória em memória.
- `package.json`: gerenciamento do projeto e dependências.

## Instalação
`npm install`

## Execução
`npm start`

Servidor: `http://localhost:3000`

## Endpoints
- POST `/users`
- GET `/users`
- GET `/users/:id`
- PUT `/users/:id`
- DELETE `/users/:id`
