const express = require('express');
const router = express.Router();
const client = require('../config/db_connect');

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

router.post('/login', (req, res) => {
  // seu login atual
});

module.exports = router;