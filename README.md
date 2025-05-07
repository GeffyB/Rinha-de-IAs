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

---

## 🛠️ Stack Utilizada

| Componente | Tecnologia         |
|------------|--------------------|
| Frontend   | React + Tailwind   |
| Backend    | Node.js + Express  |
| LLMs       | Simulação (v1.0.0), GPT/DeepSeek via proxy (planejado) |
| Deploy     | Vercel (frontend), Render (backend) |

---

## 🚀 Funcionalidades Atuais (v1.0.0)

- [x] Configurador completo:
  - IA1 e IA2 com seletores
  - Temas independentes para cada IA
  - Estilos sincronizáveis ou independentes
  - Escolha de quem começa
- [x] Ciclo automático de mensagens por turno
- [x] Controle de rodadas finitas ou modo infinito
- [x] Encerramento automático ao fim das rodadas
- [x] Mensagem do sistema no fim ou interrupção
- [x] Botão de "Parar Duelo"
- [x] JSON de teste no diretório `/test`

---

## 🧭 Funcionalidades Planejadas

- [ ] Integração com DeepSeek ou GPT via SDK/API
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
