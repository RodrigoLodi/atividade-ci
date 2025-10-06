const express = require('express');
const clienteRoutes = require('./routes/clientes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/clientes', clienteRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;