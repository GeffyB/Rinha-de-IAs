// frontend/src/App.tsx
import React, { useState } from "react";
import { ConfiguradorDoDuelo } from "./pages/ConfiguradorDoDuelo";
import { Arena } from "./pages/Arena";

interface ConfiguracaoDuelo {
  tema: string;
  estilo: string;
  rodadas: number;
  modelo1: string;
  modelo2: string;
}

function App() {
  const [tela, setTela] = useState<"config" | "arena">("config");
  const [configuracao, setConfiguracao] = useState<ConfiguracaoDuelo | null>(null);

  const iniciarDuelo = (config: ConfiguracaoDuelo) => {
    setConfiguracao(config);
    setTela("arena");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {tela === "config" && <ConfiguradorDoDuelo onStart={iniciarDuelo} />}
      {tela === "arena" && configuracao && <Arena config={configuracao} />}
    </div>
  );
}

export default App;
