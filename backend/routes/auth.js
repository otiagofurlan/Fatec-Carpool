const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Simulação simples de login
  if (email === 'teste@fatec.com' && senha === '123456') {
    return res.json({ success: true, message: 'Login bem-sucedido' });
  }

  return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
});

module.exports = router;
