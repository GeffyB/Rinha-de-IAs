// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.send('🧠 Backend da Rinha de IAs rodando!');
});

// Importa e usa rotas da Rinha
const fightRoutes = require('./routes/fight');
app.use('/api', fightRoutes);

// 🔥 Nova rota: proxy para IAs via OpenRouter
const proxyIA = require('./routes/proxy-ia');
app.use('/api', proxyIA);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
