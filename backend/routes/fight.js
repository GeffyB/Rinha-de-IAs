const express = require("express");
const router = express.Router();

// Início do duelo
router.post("/start-fight", (req, res) => {
  const { tema, estilo, modelo1 } = req.body;

  const resposta = {
    autor: modelo1,
    texto: `Vamos iniciar este embate sobre "${tema}" com uma abordagem ${estilo.toLowerCase()}.`,
  };

  res.status(200).json({ mensagens: [resposta] });
});

// Próximo turno
router.post("/next-turn", (req, res) => {
  const { config, historico, autor } = req.body;
  const turno = historico.length + 1;

  const estilo = config.estilo.toLowerCase();
  const tema = config.tema;
  const oponente =
    autor === config.modelo1 ? config.modelo2 : config.modelo1;

  const resposta = {
    autor,
    texto: `(${estilo}) ${autor} responde no turno ${turno} sobre "${tema}", refutando argumentos de ${oponente}.`,
  };

  res.status(200).json({ mensagem: resposta });
});

module.exports = router;
