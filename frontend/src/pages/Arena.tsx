// frontend/src/pages/Arena.tsx
import React, { useEffect, useState, useRef } from "react";

interface Mensagem {
  autor: string;
  texto: string;
}

interface ArenaProps {
  config: {
    tema: string;
    estilo: string;
    rodadas: number | null;
    modelo1: string;
    modelo2: string;
  };
}

export const Arena = ({ config }: ArenaProps) => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [turnoAtual, setTurnoAtual] = useState(1);
  const [emDuelo, setEmDuelo] = useState(true);
  const iaAtual = useRef(config.modelo1);

  useEffect(() => {
    const iniciarDuelo = async () => {
      try {
        const resposta = await fetch("http://localhost:3001/api/start-fight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        });

        const dados = await resposta.json();
        if (Array.isArray(dados.mensagens)) {
          setMensagens(dados.mensagens);
        } else {
          setMensagens([
            {
              autor: config.modelo1,
              texto: "⚠️ Não foi possível carregar a resposta inicial.",
            },
          ]);
        }
      } catch (erro) {
        setMensagens([
          {
            autor: config.modelo1,
            texto: "❌ Erro ao contatar o servidor.",
          },
        ]);
      } finally {
        setCarregando(false);
      }
    };

    iniciarDuelo();
  }, [config]);

  useEffect(() => {
    const ciclo = async () => {
      if (!emDuelo) return;
      if (config.rodadas !== null && turnoAtual > config.rodadas * 2 - 1) return;

      // Adiciona "..." como se a IA estivesse digitando
      const autor = iaAtual.current;
      const loadingMsg: Mensagem = { autor, texto: "..." };
      setMensagens((prev) => [...prev, loadingMsg]);

      // Espera 2 segundos antes de buscar a resposta real
      await new Promise((r) => setTimeout(r, 2000));

      try {
        const resposta = await fetch("http://localhost:3001/api/next-turn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            config,
            historico: mensagens,
            autor,
          }),
        });

        const dados = await resposta.json();
        if (dados.mensagem) {
          // Substitui o "..." pela mensagem real
          setMensagens((prev) => [
            ...prev.slice(0, -1),
            dados.mensagem,
          ]);

          // Alterna IA e próxima rodada
          iaAtual.current =
            iaAtual.current === config.modelo1 ? config.modelo2 : config.modelo1;
          setTurnoAtual((prev) => prev + 1);
        }
      } catch (e) {
        console.error("Erro no ciclo:", e);
        setMensagens((prev) => [
          ...prev.slice(0, -1),
          {
            autor,
            texto: "❌ Erro ao contatar o servidor.",
          },
        ]);
      }
    };

    if (!carregando) ciclo();
  }, [mensagens, carregando, config, emDuelo, turnoAtual]);

  const pararDuelo = () => {
    setEmDuelo(false);
    console.log("⛔ Duelo interrompido.");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">🧠 Arena de IAs</h1>
      <h2 className="text-center text-gray-600 mb-6">
        Tema: <strong>{config.tema}</strong> | Estilo: <strong>{config.estilo}</strong>
      </h2>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4 space-y-4 min-h-[200px]">
        {carregando ? (
          <p className="text-center text-gray-500">Carregando primeira resposta da IA...</p>
        ) : (
          mensagens.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg w-fit max-w-[80%] ${
                msg.autor === config.modelo1
                  ? "bg-blue-100 self-start"
                  : "bg-green-100 self-end ml-auto"
              }`}
            >
              <p className="text-sm text-gray-700 font-semibold mb-1">{msg.autor}</p>
              <p className="text-gray-900">{msg.texto}</p>
            </div>
          ))
        )}
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          onClick={pararDuelo}
        >
          ⛔ Parar Duelo
        </button>
      </div>
    </div>
  );
};
