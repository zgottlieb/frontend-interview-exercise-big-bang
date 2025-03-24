import React, { createContext, useContext, useState } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';

interface GameContextProps {
  player1Name: string;
  setPlayer1Name: React.Dispatch<React.SetStateAction<string>>;
  player2Name: string;
  setPlayer2Name: React.Dispatch<React.SetStateAction<string>>;
  player1Score: number;
  setPlayer1Score: React.Dispatch<React.SetStateAction<number>>;
  player2Score: number;
  setPlayer2Score: React.Dispatch<React.SetStateAction<number>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  resetGame: () => void;
  updateScores: (winner: 'player1' | 'player2' | 'tie') => void; // Added updateScores
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player1Name, setPlayer1Name] = useSessionStorage<string>(
    'player1Name',
    'Player 1'
  );
  const [player2Name, setPlayer2Name] = useSessionStorage<string>(
    'player2Name',
    'Player 2'
  );
  const [player1Score, setPlayer1Score] = useSessionStorage<number>(
    'player1Score',
    0
  );
  const [player2Score, setPlayer2Score] = useSessionStorage<number>(
    'player2Score',
    0
  );
  const [round, setRound] = useSessionStorage<number>('round', 1);

  const resetGame = () => {
    setPlayer1Name('Player 1');
    setPlayer2Name('Player 2');
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRound(1);
    sessionStorage.clear();
  };

  const updateScores = (winner: 'player1' | 'player2' | 'tie') => {
    if (winner === 'player1') setPlayer1Score((prev) => prev + 1);
    if (winner === 'player2') setPlayer2Score((prev) => prev + 1);
  };

  return (
    <GameContext.Provider
      value={{
        player1Name,
        setPlayer1Name,
        player2Name,
        setPlayer2Name,
        player1Score,
        setPlayer1Score,
        player2Score,
        setPlayer2Score,
        round,
        setRound,
        resetGame,
        updateScores, // Added updateScores to the context value
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
