# Configuração de GitHub Codespaces para um Servidor Backend com Node.js 🚀

Este repositório contém a configuração necessária para rodar um servidor backend com Node.js no **GitHub Codespaces**.

## 📌 Requisitos
- Conta no GitHub
- GitHub Codespaces habilitado no repositório

## 📦 Configuração do Ambiente

1. **Criação do Arquivo `.devcontainer/devcontainer.json`**  
   O Codespaces utilizará este arquivo para configurar o ambiente. O conteúdo recomendado é:

   ```json
   {
     "name": "Node.js Backend",
     "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
     "features": {
       "ghcr.io/devcontainers/features/node:1": {
         "version": "20"
       }
     },
     "customizations": {
       "vscode": {
         "settings": {
           "terminal.integrated.defaultProfile.linux": "bash"
         },
         "extensions": [
           "dbaeumer.vscode-eslint",
           "esbenp.prettier-vscode",
           "github.codespaces"
         ]
       }
     },
     "postCreateCommand": "npm install",
     "portsAttributes": {
       "3000": {
         "label": "Web Server",
         "onAutoForward": "openBrowser"
       }
     },
     "remoteUser": "vscode"
   }
   ```



## ▶️ Iniciando o Codespaces

1. Vá até o repositório no GitHub.
2. Clique em **"Code"** > **"Codespaces"** > **"New Codespace"**.
3. Aguarde a configuração do ambiente.

## 🔥 Criando e Rodando o Servidor Node.js

Execute os seguintes comandos no terminal:

```sh
npm init -y
npm install express
```

Crie o arquivo `server.js`:

```javascript
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Servidor Node.js rodando no GitHub Codespaces!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

Para rodar o servidor:

```sh
node server.js
```

O Codespaces abrirá automaticamente o navegador apontando para a aplicação.

## 📤 Commit e Compartilhamento

Após configurar tudo, commite a pasta `.devcontainer` para manter a configuração no repositório:

```sh
git add .devcontainer
git commit -m "Adicionando configuração do Codespaces para Node.js"
git push origin main
```

Agora seu ambiente está pronto para desenvolver um backend com **Node.js no GitHub Codespaces!** 🎉
