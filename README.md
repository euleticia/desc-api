# API de Alunos
Esta API permite a gestão de informações de alunos. Você pode listar, criar, atualizar e deletar registros de alunos. A aplicação foi criada utilizando MongoDB e Prisma.io.

# Executando a Aplicação
- git clone
- cd api-alunos
- npm install

- npx prisma generate
- npm start

a API deve estar disponível em http://localhost:3000.


# Endpoints
# 1. Listar Todos os Alunos
Endpoint: GET /api/alunos

Descrição: Retorna uma lista de todos os alunos. Suporta filtros por nome, CPF e email.

# Parâmetros de Consulta (Query Params):

- name (opcional): Filtra alunos pelo nome (case insensitive).
- cpf (opcional): Filtra alunos pelo CPF.
- email (opcional): Filtra alunos pelo email (case insensitive).
# Exemplo de Requisição:

GET /api/alunos?name=joao&cpf=12345678901&email=joao@example.com HTTP/1.1
Host: localhost:3000

# Resposta de Sucesso:
[
  {
    "id": "1",
    "name": "João Silva",
    "cpf": "12345678901",
    "email": "joao@example.com"
  }
]

# 2. Criar um Novo Aluno
Endpoint: POST /api/alunos

Descrição: Cria um novo registro de aluno.

Corpo da Requisição (Request Body):

- name (string, obrigatório): Nome do aluno.
- cpf (string, obrigatório): CPF do aluno.
- email (string, obrigatório): Email do aluno.
  
# Exemplo de Requisição:

POST /api/alunos HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "João Silva",
  "cpf": "12345678901",
  "email": "joao@example.com"
}

# Resposta de Sucesso:

{
  "id": "1",
  "name": "João Silva",
  "cpf": "12345678901",
  "email": "joao@example.com"
}

# 3. Atualizar um Aluno Existente
Endpoint: PUT /api/alunos/:id

Descrição: Atualiza as informações de um aluno existente.

Parâmetros da URL:

- id (string, obrigatório): ID do aluno a ser atualizado.
  
Corpo da Requisição (Request Body):

- name (string, opcional): Nome do aluno.
- cpf (string, opcional): CPF do aluno.
- email (string, opcional): Email do aluno.

# Exemplo de Requisição:

PUT /api/alunos/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Maria Souza",
  "cpf": "12345678902",
  "email": "maria@example.com"
}

# Resposta de Sucesso:

{
  "id": "1",
  "name": "Maria Souza",
  "cpf": "12345678902",
  "email": "maria@example.com"
}

# 4. Deletar um Aluno Existente
Endpoint: DELETE /api/alunos/:id

Descrição: Deleta um aluno existente.

Parâmetros da URL:

- id (string, obrigatório): ID do aluno a ser deletado.
  
# Exemplo de Requisição:

DELETE /api/alunos/1 HTTP/1.1
Host: localhost:3000

# Testes
Para executar os testes, use o seguinte comando:

- npm test

# Executando com Docker

- npx prisma generate
- docker-compose build
- docker-compose up






