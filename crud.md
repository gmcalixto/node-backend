# CRUD de Usuários com Node.js e MySQL 🚀

Este repositório contém uma API RESTful para operações CRUD de usuários utilizando **Node.js**, **Express** e **MySQL**.

## 📌 Requisitos

- **Node.js** instalado
- **MySQL** instalado e configurado
- **Git** instalado (opcional)
- Conta no **GitHub Codespaces** (opcional para desenvolvimento na nuvem)

## 📦 Instalação das Dependências

Clone o repositório e instale as dependências necessárias:

```sh
git clone https://github.com/seu-repositorio.git
cd seu-repositorio
npm install
```

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:

```
DB_HOST=db4free.net
DB_USER=alunoead
DB_PASSWORD=aulaphpsenac
DB_NAME=senacead
PORT=3000
```

## 🗄️ Criação da Tabela MySQL

Antes de executar a API, crie a tabela `usuarios` no banco de dados MySQL:

```sql
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
```

## 🔥 Funcionamento do Código

O arquivo `crud.js` implementa um servidor **Express** que interage com um banco de dados **MySQL**, permitindo operações **CRUD** na tabela `usuarios`. As funcionalidades incluem:

- Conexão ao banco de dados via **mysql2**
- Endpoints REST para criar, ler, atualizar e deletar usuários
- Uso do **dotenv** para variáveis de ambiente

## ▶️ Inicializando o Servidor

Execute o seguinte comando para iniciar a API:

```sh
node crud.js
```

A API estará disponível na porta `3000` (ou conforme definido no `.env`).

## 🛠️ Endpoints Disponíveis

### 🔹 Listar todos os usuários
```http
GET /usuarios
```
**Resposta:**
```json
[
  {"id": 1, "email": "usuario@email.com", "nome": "Usuário Exemplo"}
]
```

### 🔹 Obter um usuário pelo ID
```http
GET /usuarios/:id
```
**Exemplo:** `/usuarios/1`

**Resposta:**
```json
{"id": 1, "email": "usuario@email.com", "nome": "Usuário Exemplo"}
```

### 🔹 Criar um novo usuário
```http
POST /usuarios
```
**Corpo da requisição:**
```json
{
  "email": "novo@email.com",
  "nome": "Novo Usuário",
  "senha": "senha123"
}
```
**Resposta:**
```json
{"id": 2, "email": "novo@email.com", "nome": "Novo Usuário"}
```

### 🔹 Atualizar um usuário existente
```http
PUT /usuarios/:id
```
**Exemplo:** `/usuarios/2`

**Corpo da requisição:**
```json
{
  "email": "atualizado@email.com",
  "nome": "Usuário Atualizado",
  "senha": "novaSenha"
}
```
**Resposta:**
```json
{"message": "Usuário atualizado com sucesso"}
```

### 🔹 Deletar um usuário
```http
DELETE /usuarios/:id
```
**Exemplo:** `/usuarios/2`

**Resposta:**
```json
{"message": "Usuário excluído com sucesso"}
```

## 📤 Commit e Compartilhamento

Após configurar tudo, commite as alterações para manter a configuração no repositório:

```sh
git add .
git commit -m "Configuração e implementação do CRUD"
git push origin main
```

Agora seu backend com **Node.js e MySQL** está pronto para uso! 🚀