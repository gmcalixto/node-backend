require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db4free.net',
    user: process.env.DB_USER || 'alunoead',
    password: process.env.DB_PASSWORD || 'aulaphpsenac',
    database: process.env.DB_NAME || 'senacead',
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

// Rota para obter todos os usuários
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Rota para obter um usuário pelo ID
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(results[0]);
    });
});

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
    const { email, nome, senha } = req.body;
    if (!email || !nome || !senha) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

    db.query('INSERT INTO usuarios (email, nome, senha) VALUES (?, ?, ?)', [email, nome, senha], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, email, nome });
    });
});

// Rota para atualizar um usuário pelo ID
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { email, nome, senha } = req.body;
    if (!email || !nome || !senha) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

    db.query('UPDATE usuarios SET email = ?, nome = ?, senha = ? WHERE id = ?', [email, nome, senha, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário atualizado com sucesso' });
    });
});

// Rota para excluir um usuário pelo ID
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário excluído com sucesso' });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
