require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db4free.net',
    user: process.env.DB_USER || 'alunoead',
    password: process.env.DB_PASSWORD || 'aulaphpsenac',
    database: process.env.DB_NAME || 'senacead',
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

// Configuração do Passport com Google OAuth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Middleware para verificar autenticação
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Usuário não autenticado' });
};

// Rotas de autenticação
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.json({ message: 'Autenticado com sucesso', user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: 'Erro ao fazer logout' });
        res.json({ message: 'Logout realizado com sucesso' });
    });
});

// Rotas protegidas
app.get('/usuarios', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/usuarios/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(results[0]);
    });
});

app.post('/usuarios', isAuthenticated, (req, res) => {
    const { email, nome, senha } = req.body;
    if (!email || !nome || !senha) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

    db.query('INSERT INTO usuarios (email, nome, senha) VALUES (?, ?, ?)', [email, nome, senha], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, email, nome });
    });
});

app.put('/usuarios/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const { email, nome, senha } = req.body;
    if (!email || !nome || !senha) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });

    db.query('UPDATE usuarios SET email = ?, nome = ?, senha = ? WHERE id = ?', [email, nome, senha, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário atualizado com sucesso' });
    });
});

app.delete('/usuarios/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário excluído com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
