# 🧠 Rinha de IAs

Aplicação web que simula embates entre agentes de IA com temas, estilos e limites definidos pelo usuário. Com visual em estilo de chat, alternância automática entre os modelos e ritmo de digitação simulada.

---

## 📦 Estrutura de Diretórios

```
Rinha-de-IAs/
├── frontend/      # Aplicação React (UI da arena e configuração)
├── backend/       # API Node.js + Express para orquestração de turnos
├── docs/          # Memória, roadmap, exemplos de prompt e arquitetura
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚧 Histórico de Versões

| Versão   | Data       | Descrição                                                    |
|----------|------------|---------------------------------------------------------------|
| v0.1.0   | 2024-05-06 | Estrutura inicial do projeto + diretórios base                |
| v0.2.0   | 2024-05-06 | Integração inicial entre frontend e backend + primeira fala   |
| v0.3.0   | 2024-05-06 | Ciclo automático entre IAs (modo limitado ou infinito)        |
| v0.4.0   | 2024-05-06 | Simulação de digitação com mensagens de carregamento dinâmico |

---

## 🛠️ Stack Utilizada

| Componente | Tecnologia         |
|------------|--------------------|
| Frontend   | React + Tailwind   |
| Backend    | Node.js + Express  |
| LLMs       | Simulação (v0.4.0), GPT & Multi-model (planejado p/ v1.0) |
| Deploy     | Vercel (frontend), Render (backend) |

---

## 🚀 Features do MVP

- [x] Configuração de duelo (tema, estilo, IA1, IA2, modo)
- [x] Execução de duelo com alternância automática
- [x] Modo infinito ou por rodadas
- [x] Simulação de digitação
- [x] Botão "Parar Duelo"

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