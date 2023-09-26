import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dado1, setDado1] = useState(null);
  const [dado2, setDado2] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState({ vitorias: [], derrotas: [] });

  const lancarDados = () => {
    const novoDado1 = Math.floor(Math.random() * 6) + 1;
    const novoDado2 = Math.floor(Math.random() * 6) + 1;
    const soma = novoDado1 + novoDado2;

    setDado1(novoDado1);
    setDado2(novoDado2);
    setResultado(soma);

    const roundData = {
      dado1: novoDado1,
      dado2: novoDado2,
      soma: soma,
    };

    if (soma === 7) {
      setHistorico((prevHistorico) => ({
        ...prevHistorico,
        vitorias: [...prevHistorico.vitorias, roundData],
      }));
      alert('Você ganhou!');
    } else {
      setHistorico((prevHistorico) => ({
        ...prevHistorico,
        derrotas: [...prevHistorico.derrotas, roundData],
      }));
      alert('Você perdeu. Tente novamente.');
    }

    // Você também pode salvar o histórico no AsyncStorage aqui
  };

  return (
    <AppContext.Provider value={{ dado1, dado2, resultado, historico, lancarDados }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
