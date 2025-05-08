const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

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

// Próximo turno com chamada real à IA
router.post("/next-turn", async (req, res) => {
  try {
    const { config, historico = [], autor } = req.body;

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

    const modeloReal = {
      "GPT-4": "openai/gpt-4",
      "GPT-3.5": "openai/gpt-3.5-turbo",
      "DeepSeek": "deepseek/deepseek-r1:free",
    };

    const modeloIA = modeloReal[autor] || autor;

    const systemPrompt = `Você é ${autor}, um debatedor habilidoso.
Estilo: ${estilo}.
Tema: ${tema}.
Oponente: ${oponente}.
Refute os argumentos anteriores e avance no debate.`;

    const mensagens = [
      { role: "system", content: systemPrompt },
      ...historico.map((m) => ({
        role: m.autor === autor ? "assistant" : "user",
        content: m.texto,
      })),
    ];

    const resposta = await fetch("http://localhost:3001/api/proxy-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelo: modeloIA,
        mensagens,
        autor,
      }),
    });

    if (!resposta.ok) {
      const erroTexto = await resposta.text();
      console.error("❌ Erro HTTP do proxy IA:", resposta.status, erroTexto);
      return res.status(500).json({ erro: `Erro da IA: ${resposta.status}`, detalhes: erroTexto });
    }

    const dados = await resposta.json();
    console.log("📥 Resposta bruta da IA:", dados);

    // CORREÇÃO AQUI
    const textoIA = dados?.texto || null;

    if (textoIA) {
      return res.status(200).json({
        mensagem: {
          autor,
          texto: textoIA,
        },
      });
    } else {
      return res.status(500).json({ erro: "Sem resposta da IA", detalhes: dados });
    }
  } catch (err) {
    console.error("❌ Erro em /next-turn:", err.message);
    res.status(500).json({ erro: "Erro ao processar o turno.", detalhes: err.message });
  }
});

module.exports = router;
