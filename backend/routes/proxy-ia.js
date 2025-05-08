const express = require("express");
const router = express.Router();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

router.post("/proxy-chat", async (req, res) => {
  console.log("✅ ROTA /proxy-chat ACIONADA");

  try {
    const { modelo, mensagens, autor } = req.body;

    const resposta = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Rinha-de-IAs MVP"
      },
      body: JSON.stringify({
        model: modelo,
        messages: mensagens,
        max_tokens: 300, // ⚠️ Limite imposto pelo plano gratuito do OpenRouter (~666 tokens disponíveis)
      }),
    });

    const data = await resposta.json();

    // Log para debug
    console.log("📥 Resposta bruta da IA:", data);

    if (data.choices && data.choices.length > 0) {
      const texto = data.choices[0].message.content;
      return res.status(200).json({ texto });
    } else {
      return res.status(500).json({ erro: "Resposta inesperada da IA.", detalhes: data });
    }

  } catch (err) {
    console.error("❌ Erro no proxy-chat:", err);
    res.status(500).json({ erro: "Erro interno no proxy." });
  }
});

module.exports = router;
