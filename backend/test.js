// test.js
const client = require('./db_connect.js');

async function criarTabelaTeste() {
  try {
    const res = await client.query('CREATE TABLE IF NOT EXISTS Teste (id SERIAL PRIMARY KEY, nome TEXT)');
    console.log("Tabela criada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  } finally {
    client.end(); // encerra conexão após executar
  }
}

criarTabelaTeste();
