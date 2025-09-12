require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fatec Carpool API esta funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Fatec Carpool Backend' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
  console.log('Acesse: http://localhost:' + PORT);
});