const express = require("express");
const router = express.Router();

// Início do duelo
router.post("/start-fight", (req, res) => {
  const {
    modelo1,
    modelo2,
    tema1,
    tema2,
    estilo1,
    estilo2,
    quemComeca,
  } = req.body;

  const primeiro = quemComeca === "aleatorio"
    ? Math.random() < 0.5 ? modelo1 : modelo2
    : quemComeca === "modelo1" ? modelo1 : modelo2;

  const tema = primeiro === modelo1 ? tema1 : tema2;
  const estilo = primeiro === modelo1 ? estilo1 : estilo2;

  const resposta = {
    autor: primeiro,
    texto: `🗣️ ${primeiro} inicia o duelo defendendo "${tema}" com estilo ${estilo.toLowerCase()}.`,
  };

  res.status(200).json({ mensagens: [resposta] });
});

// Próximo turno
router.post("/next-turn", (req, res) => {
  try {
    const { config, historico = [], autor } = req.body;
    const turno = historico.length + 1;

    const {
      modelo1,
      modelo2,
      tema1,
      tema2,
      estilo1,
      estilo2,
    } = config;

    const oponente = autor === modelo1 ? modelo2 : modelo1;
    const tema = autor === modelo1 ? tema1 : tema2;
    const estilo = autor === modelo1 ? estilo1 : estilo2;

    const resposta = {
      autor,
      texto: `💬 (${estilo}) ${autor} responde no turno ${turno}, defendendo "${tema}" e refutando argumentos de ${oponente}.`,
    };

    res.status(200).json({ mensagem: resposta });
  } catch (err) {
    console.error("Erro em /next-turn:", err);
    res.status(500).json({ erro: "Erro ao processar o turno." });
  }
});

module.exports = router;
