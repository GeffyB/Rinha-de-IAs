# 🧠 Rinha de IAs

Aplicação web que simula embates entre agentes de IA com temas, estilos e limites definidos pelo usuário. Com visual em estilo de chat, alternância automática entre os modelos e ritmo de digitação simulada.

---

## 📦 Estrutura de Diretórios

```
Rinha-de-IAs/
├── frontend/      # Aplicação React (UI da arena e configuração)
├── backend/       # API Node.js + Express para orquestração de turnos
├── test/          # JSONs de exemplo para teste via Postman ou CLI
├── docs/          # Memória, roadmap, exemplos de prompt e arquitetura
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚧 Histórico de Versões

| Versão   | Data       | Descrição                                                                 |
|----------|------------|---------------------------------------------------------------------------|
| v0.1.0   | 2024-05-06 | Estrutura inicial do projeto + diretórios base                            |
| v0.2.0   | 2024-05-06 | Integração inicial entre frontend e backend + primeira fala               |
| v0.3.0   | 2024-05-06 | Ciclo automático entre IAs (modo limitado ou infinito)                    |
| v0.4.0   | 2024-05-06 | Simulação de digitação com mensagens de carregamento dinâmico             |
| v0.5.0   | 2024-05-07 | Configurador completo (tema, estilo por IA, ordem, modo); duelo funcional |
| v0.6.0   | 2024-05-07 | Integração com OpenRouter (GPT-4/DeepSeek) e respostas reais no frontend  |

---

## 🛠️ Stack Utilizada

| Componente | Tecnologia         |
|------------|--------------------|
| Frontend   | React + Tailwind   |
| Backend    | Node.js + Express  |
| LLMs       | OpenRouter (GPT-4, DeepSeek) via proxy REST |
| Deploy     | Vercel (frontend), Render (backend) |

---

## 🚀 Funcionalidades Atuais (v0.6.0)

- [x] Configurador completo:
  - IA1 e IA2 com seletores
  - Temas independentes para cada IA
  - Estilos sincronizáveis ou independentes
  - Escolha de quem começa
- [x] Ciclo automático de mensagens por turno
- [x] Controle de rodadas finitas ou modo infinito
- [x] Mensagem do sistema no fim ou interrupção
- [x] Integração com IAs reais via OpenRouter
- [x] Proxy backend com `.env` para chave segura
- [x] Botão de "Parar Duelo"
- [x] JSON de teste no diretório `/test`
- [ ] Falta lógica para:
  - Respostas vazias com fallback
  - Encerramento automático com base no ciclo lógico
  - Prompt estruturado por estilo/tema

---

## 🧭 Funcionalidades Planejadas

- [ ] Respostas por IA com estilo limitado (ex: 4 frases)
- [ ] Mensagens criativas para IA silenciosa
- [ ] Logs e replays dos duelos
- [ ] Votação para decidir o vencedor
- [ ] IA julgadora (modo 3º agente)
- [ ] Histórico persistente (Firestore ou Supabase)

---

## 🧪 Teste Local da API

```bash
# Enviar requisição de teste no Postman:
POST http://localhost:3001/api/start-fight
Body: raw → JSON
Conteúdo: veja arquivo /test/fight-example.json
```

---

## 👨‍💻 Dev

```bash
# Rodar frontend
cd frontend
npm install
npm run dev

# Rodar backend
cd backend
npm install
node server.js
```
## ⚠️ Limitações do Plano Gratuito (OpenRouter)

Este projeto usa o provedor OpenRouter para interagir com IAs como DeepSeek.

Por padrão, o plano gratuito possui um limite de ~666 tokens por requisição. Para garantir funcionamento:

- **Limitamos as respostas a 300 tokens**
- Caso queira gerar respostas mais longas, será necessário:
  - Reduzir o conteúdo do histórico (menos mensagens por chamada)
  - Adquirir um plano pago no OpenRouter

Este limite pode ser alterado em `backend/routes/proxy-ia.js`, no campo `max_tokens`.