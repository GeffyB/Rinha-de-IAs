// frontend/src/pages/ConfiguradorDoDuelo.tsx
import React, { useState } from "react";

const estilos = ["Filosófico", "Rima", "Factual", "Sarcasmo", "Livre"];
const modelos = ["GPT-4", "DeepSeek", "Claude", "LLaMA", "Gemini"];

interface ConfiguradorProps {
  onStart: (config: {
    tema: string;
    estilo: string;
    rodadas: number | null;
    modelo1: string;
    modelo2: string;
  }) => void;
}

export const ConfiguradorDoDuelo = ({ onStart }: ConfiguradorProps) => {
  const [tema, setTema] = useState("");
  const [estilo, setEstilo] = useState(estilos[0]);
  const [rodadas, setRodadas] = useState(5);
  const [modoInfinito, setModoInfinito] = useState(false);
  const [modelo1, setModelo1] = useState(modelos[0]);
  const [modelo2, setModelo2] = useState(modelos[1]);

  const iniciarDuelo = () => {
    onStart({
      tema,
      estilo,
      rodadas: modoInfinito ? null : rodadas,
      modelo1,
      modelo2,
    });
  };

  return (
    <div className="px-4 py-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-center">⚔️ Rinha de IAs</h1>

      <div>
        <label className="block font-medium mb-1">Tema do Debate:</label>
        <input
          className="w-full border p-2 rounded"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Ex: Coca-Cola vs Pepsi"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Estilo:</label>
        <select
          className="w-full border p-2 rounded"
          value={estilo}
          onChange={(e) => setEstilo(e.target.value)}
        >
          {estilos.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Número de Rodadas:</label>
        <input
          className="w-full border p-2 rounded"
          type="number"
          min={1}
          max={30}
          value={rodadas}
          onChange={(e) => setRodadas(parseInt(e.target.value))}
          disabled={modoInfinito}
        />
        <label className="block mt-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={modoInfinito}
            onChange={(e) => setModoInfinito(e.target.checked)}
          />
          Modo Infinito (só para quando clicar em "Parar Duelo")
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1">IA 1:</label>
        <select
          className="w-full border p-2 rounded"
          value={modelo1}
          onChange={(e) => setModelo1(e.target.value)}
        >
          {modelos.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">IA 2:</label>
        <select
          className="w-full border p-2 rounded"
          value={modelo2}
          onChange={(e) => setModelo2(e.target.value)}
        >
          {modelos.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        onClick={iniciarDuelo}
      >
        Iniciar Duelo
      </button>
    </div>
  );
};
