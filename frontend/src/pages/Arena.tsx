// frontend/src/pages/Arena.tsx
import React, { useEffect, useState, useRef } from "react";

interface Mensagem {
  autor: string;
  texto: string;
}

interface ArenaProps {
  config: {
    tema1: string;
    tema2: string;
    estilo1: string;
    estilo2: string;
    sincronizarEstilos: boolean;
    rodadas: number | null;
    modoInfinito: boolean;
    modelo1: string;
    modelo2: string;
    quemComeca: "modelo1" | "modelo2" | "aleatorio";
  };
}

export const Arena = ({ config }: ArenaProps) => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [turnoAtual, setTurnoAtual] = useState(1);
  const [emDuelo, setEmDuelo] = useState(true);
  const iaAtual = useRef<string>("");

  useEffect(() => {
    // Define quem começa
    iaAtual.current =
      config.quemComeca === "aleatorio"
        ? Math.random() < 0.5 ? config.modelo1 : config.modelo2
        : config.quemComeca === "modelo1"
        ? config.modelo1
        : config.modelo2;

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
              autor: iaAtual.current,
              texto: "⚠️ Não foi possível carregar a resposta inicial.",
            },
          ]);
        }
      } catch (erro) {
        setMensagens([
          {
            autor: iaAtual.current,
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
    if (carregando || !emDuelo) return;

    if (config.rodadas !== null && turnoAtual > config.rodadas * 2) {
      setEmDuelo(false);
      setMensagens((prev) => [
        ...prev,
        {
          autor: "🧠 Sistema",
          texto: `🎉 Duelo encerrado automaticamente após ${config.rodadas} rodadas.`,
        },
      ]);
      return;
    }

    const autor = iaAtual.current;

    const loadingMsg: Mensagem = { autor, texto: "..." };
    setMensagens((prev) => [...prev, loadingMsg]);

    const timeout = setTimeout(async () => {
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
          setMensagens((prev) => [...prev.slice(0, -1), dados.mensagem]);
          // Alterna IA
          iaAtual.current =
            iaAtual.current === config.modelo1
              ? config.modelo2
              : config.modelo1;

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
    }, 2000);

    return () => clearTimeout(timeout);
  }, [turnoAtual, carregando, emDuelo, config]);

  const pararDuelo = () => {
    setEmDuelo(false);
    setMensagens((prev) => [
      ...prev,
      {
        autor: "🧠 Sistema",
        texto: "⛔ Duelo interrompido manualmente.",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">🧠 Arena de IAs</h1>
      <h2 className="text-center text-gray-600 mb-6">
        <strong>{config.modelo1}</strong> vs <strong>{config.modelo2}</strong> —{" "}
        <em>{config.tema1}</em> vs <em>{config.tema2}</em>
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
                  : msg.autor === config.modelo2
                  ? "bg-green-100 self-end ml-auto"
                  : "bg-gray-200 mx-auto"
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
