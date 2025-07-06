const express = require('express');
const router = express.Router();
const client = require('../config/db_connect');

// Rota de cadastro
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.json({ success: false, message: 'Preencha todos os campos.' });
  }

  try {
    await client.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, email, senha]
    );
    res.json({ success: true, message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    if (error.code === '23505') {
      return res.json({ success: false, message: 'E-mail já cadastrado.' });
    }
    console.error('Erro no cadastro:', error);
    res.json({ success: false, message: 'Erro no servidor.' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.json({ success: false, message: 'Preencha todos os campos.' });
  }

  try {
    const result = await client.query(
      'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login realizado com sucesso.' });
    } else {
      res.json({ success: false, message: 'E-mail ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
});

module.exports = router;
