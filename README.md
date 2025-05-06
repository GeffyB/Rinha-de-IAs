# 🧠 Rinha de IAs

Aplicação web que simula embates entre agentes de IA em diferentes temas, estilos e rodadas, com visual fluido e controle do usuário.

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

| Versão   | Data       | Descrição                       |
|----------|------------|----------------------------------|
| v0.1.0   | 2024-05-06 | Estrutura inicial e documentação |
| v0.2.0   | Em breve   | Setup React + Express            |

---

## 🛠️ Stack Utilizada

| Componente | Tecnologia         |
|------------|--------------------|
| Frontend   | React + Tailwind   |
| Backend    | Node.js + Express  |
| LLMs       | OpenAI GPT (v1), multi-modelo (v2) |
| Deploy     | Vercel (frontend), Render (backend) |

---

## 🚀 Features do MVP

- [x] Configuração de duelo (tema, estilo, rodadas)
- [x] Arena com mensagens alternadas
- [x] Botão "Parar"
- [x] Tela de encerramento com votação

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
npm run dev
```
