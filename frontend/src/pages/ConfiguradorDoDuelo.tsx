// frontend/src/pages/ConfiguradorDoDuelo.tsx
import React, { useState, useEffect } from "react";

const estilos = ["Filosófico", "Rima", "Factual", "Sarcasmo", "Livre"];
const modelos = ["GPT-4", "DeepSeek", "Claude", "LLaMA", "Gemini"];

interface ConfiguradorProps {
  onStart: (config: any) => void;
}

export const ConfiguradorDoDuelo = ({ onStart }: ConfiguradorProps) => {
  const [modelo1, setModelo1] = useState(modelos[0]);
  const [modelo2, setModelo2] = useState(modelos[1]);
  const [tema1, setTema1] = useState("");
  const [tema2, setTema2] = useState("");
  const [estilo1, setEstilo1] = useState(estilos[0]);
  const [estilo2, setEstilo2] = useState(estilos[0]);
  const [sincronizarEstilos, setSincronizarEstilos] = useState(true);
  const [rodadas, setRodadas] = useState(5);
  const [modoInfinito, setModoInfinito] = useState(false);
  const [quemComeca, setQuemComeca] = useState("aleatorio");

  useEffect(() => {
    if (sincronizarEstilos) {
      setEstilo2(estilo1);
    }
  }, [estilo1, sincronizarEstilos]);

  const iniciarDuelo = () => {
    if (!tema1.trim() || !tema2.trim()) {
      alert("⚠️ Os dois temas devem ser preenchidos.");
      return;
    }

    if (modelo1 === modelo2) {
      alert("⚠️ Selecione modelos de IA diferentes para o duelo.");
      return;
    }

    if (!modoInfinito && (!rodadas || rodadas < 1)) {
      alert("⚠️ Número de rodadas inválido.");
      return;
    }

    onStart({
      modelo1,
      modelo2,
      tema1,
      tema2,
      estilo1,
      estilo2,
      sincronizarEstilos,
      rodadas: modoInfinito ? null : rodadas,
      modoInfinito,
      quemComeca,
    });
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-center">⚔️ Rinha de IAs – Configurador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IA 1 */}
        <div>
          <h2 className="font-semibold text-lg mb-2 text-blue-700">IA 1</h2>
          <label className="block font-medium mb-1">Modelo:</label>
          <select className="w-full border p-2 rounded" value={modelo1} onChange={(e) => setModelo1(e.target.value)}>
            {modelos.map((m) => <option key={m}>{m}</option>)}
          </select>

          <label className="block font-medium mt-4 mb-1">Tema:</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Ex: Coca-Cola"
            value={tema1}
            onChange={(e) => setTema1(e.target.value)}
          />

          <label className="block font-medium mt-4 mb-1">Estilo:</label>
          <select className="w-full border p-2 rounded" value={estilo1} onChange={(e) => setEstilo1(e.target.value)}>
            {estilos.map((est) => <option key={est}>{est}</option>)}
          </select>
        </div>

        {/* IA 2 */}
        <div>
          <h2 className="font-semibold text-lg mb-2 text-green-700">IA 2</h2>
          <label className="block font-medium mb-1">Modelo:</label>
          <select className="w-full border p-2 rounded" value={modelo2} onChange={(e) => setModelo2(e.target.value)}>
            {modelos.map((m) => <option key={m}>{m}</option>)}
          </select>

          <label className="block font-medium mt-4 mb-1">Tema:</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Ex: Pepsi"
            value={tema2}
            onChange={(e) => setTema2(e.target.value)}
          />

          <label className="block font-medium mt-4 mb-1">Estilo:</label>
          <select
            className="w-full border p-2 rounded"
            value={estilo2}
            onChange={(e) => setEstilo2(e.target.value)}
            disabled={sincronizarEstilos}
          >
            {estilos.map((est) => <option key={est}>{est}</option>)}
          </select>

          <label className="block mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={sincronizarEstilos}
              onChange={(e) => setSincronizarEstilos(e.target.checked)}
            />
            Usar mesmo estilo para ambas as IAs
          </label>
        </div>
      </div>

      {/* Rodadas e ordem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Número de Rodadas:</label>
          <input
            type="number"
            min={1}
            max={30}
            className="w-full border p-2 rounded"
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
            Modo Infinito
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">Quem começa o duelo?</label>
          <select className="w-full border p-2 rounded" value={quemComeca} onChange={(e) => setQuemComeca(e.target.value)}>
            <option value="modelo1">IA 1</option>
            <option value="modelo2">IA 2</option>
            <option value="aleatorio">Aleatório</option>
          </select>
        </div>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-4"
        onClick={iniciarDuelo}
      >
        Iniciar Duelo
      </button>
    </div>
  );
};
