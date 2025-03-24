import { useState } from 'react';
import { determineWinner, Messages } from '../utils/gameLogic';
import { Choice } from '../types';

interface GameResult {
  winner: 'player1' | 'player2' | 'tie';
  explanation: string;
}

export const useGameResult = () => {
  const [result, setResult] = useState<GameResult | null>(null);

  const calculateResult = (player1Choice: Choice, player2Choice: Choice) => {
    const winner = determineWinner(player1Choice, player2Choice);
    let explanation = "It's a tie! Great minds think alike!";
    if (winner !== 'tie') {
      const winningChoice =
        winner === 'player1' ? player1Choice : player2Choice;
      const losingChoice = winner === 'player1' ? player2Choice : player1Choice;

      explanation = `${winningChoice} beats ${losingChoice}. ${Messages[winningChoice]}`;
    }
    setResult({ winner, explanation });
    return winner;
  };

  const resetResult = () => setResult(null);

  return { result, calculateResult, resetResult };
};
