const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// --- 1. CONFIGURAÇÃO DA CONEXÃO COM O BANCO DE DADOS ---
// Sequelize vai conectar ao banco 'minha_escola' com o usuário 'root'
const sequelize = new Sequelize('db_projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// --- 2. DEFINIÇÃO DO "MOLDE" DO ALUNO (MODEL) ---
// Estamos dizendo ao Sequelize como é a tabela de alunos.
// Ele vai criar uma tabela chamada "Alunos" (no plural) no banco.
const Aluno = sequelize.define('Aluno', {
    // Coluna 'nome': do tipo texto e não pode ser nula.
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Coluna 'email': do tipo texto, não pode ser nula e deve ser única.
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // Coluna 'telefone': do tipo texto, pode ser nula.
    telefone: {
        type: DataTypes.STRING
    }
    // As colunas 'id', 'createdAt' e 'updatedAt' são criadas automaticamente!
});

// --- 3. CONFIGURAÇÃO DO SERVIDOR EXPRESS ---
const app = express();
app.use(cors());      // Permite que o frontend acesse a API
app.use(express.json()); // Permite que o servidor entenda JSON

const port = 3001;

// --- 4. DEFINIÇÃO DAS ROTAS (ENDPOINTS) ---

// ROTA GET: Buscar todos os alunos
app.get('/alunos', async (req, res) => {
    // Aluno.findAll() é o mesmo que "SELECT * FROM Alunos;"
    const todosOsAlunos = await Aluno.findAll();
    res.json(todosOsAlunos);
});

// ROTA POST: Cadastrar um novo aluno
app.post('/alunos', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;

        // Aluno.create(...) é o mesmo que "INSERT INTO Alunos (nome, email, ...) VALUES (...);"
        const novoAluno = await Aluno.create({ nome, email, telefone });

        res.status(201).json({ message: 'Aluno cadastrado com sucesso!', aluno: novoAluno });

    } catch (error) {
        // Se o email já existir, vai dar erro.
        res.status(400).json({ message: 'Erro ao cadastrar aluno. Verifique se o email já existe.' });
    }
});


// --- 5. INICIANDO O SERVIDOR E SINCRONIZANDO COM O BANCO ---
// Primeiro, tentamos conectar e sincronizar com o banco de dados.
// sequelize.sync() vai criar a tabela "Alunos" se ela ainda não existir.
sequelize.sync().then(() => {
    // Se a sincronização deu certo, iniciamos o servidor.
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
        console.log('✅ Banco de dados sincronizado.');
    });
}).catch((error) => {
    console.error('❌ Erro ao conectar ou sincronizar com o banco de dados:', error);
});