import React, { useState } from 'react';
import { determineWinner } from '../utils/gameLogic';
import Button from './Button';
import { icons } from '../assets/icons';

interface GameProps {
  updateScores: (winner: 'player1' | 'player2' | 'tie') => void;
  resetGame: () => void;
}

const Game: React.FC<GameProps> = ({ updateScores, resetGame }) => {
  const [player1Choice, setPlayer1Choice] = useState<string | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<{
    winner: string;
    explanation: string;
  } | null>(null);

  const choices: (keyof typeof icons)[] = [
    'Rock',
    'Paper',
    'Scissors',
    'Lizard',
    'Spock',
  ];

  const toggleChoice = (
    choice: string,
    setChoice: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setChoice((prevChoice) => (prevChoice === choice ? null : choice));
  };

  const handleReveal = () => {
    if (player1Choice && player2Choice) {
      const winner = determineWinner(player1Choice, player2Choice);
      let explanation = "It's a tie! Great minds think alike!";
      if (winner !== 'tie') {
        const winningChoice =
          winner === 'player1' ? player1Choice : player2Choice;
        const losingChoice =
          winner === 'player1' ? player2Choice : player1Choice;

        const messages: Record<string, string> = {
          Rock: 'Rock crushes Scissors and flattens Lizard!',
          Paper: 'Paper covers Rock and disproves Spock!',
          Scissors: 'Scissors cut Paper and trim Lizard!',
          Lizard: 'Lizard eats Paper and poisons Spock!',
          Spock: 'Spock vaporizes Rock and breaks Scissors!',
        };

        explanation = `${winningChoice} beats ${losingChoice}. ${messages[winningChoice]}`;
      }
      setResult({ winner, explanation });
      updateScores(winner);
      setStep(4); // Show the result without incrementing the round
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Player 1, make your choice</h2>
          <div className="choices-container">
            {choices.map((choice) => (
              <Button
                key={choice}
                onClick={() => toggleChoice(choice, setPlayer1Choice)}
                className={player1Choice === choice ? 'selected' : ''}
              >
                <span className="emoji">{icons[choice]}</span> {choice}
              </Button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            className="next-button"
            disabled={!player1Choice}
          >
            Submit
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Player 2, make your choice</h2>
          <div className="choices-container">
            {choices.map((choice) => (
              <Button
                key={choice}
                onClick={() => toggleChoice(choice, setPlayer2Choice)}
                className={player2Choice === choice ? 'selected' : ''}
              >
                <span className="emoji">{icons[choice]}</span> {choice}
              </Button>
            ))}
          </div>
          <button
            onClick={() => {
              handleReveal();
            }}
            className="next-button"
            disabled={!player2Choice}
          >
            Submit
          </button>
        </div>
      )}
      {step === 4 && result && (
        <div>
          <h2>
            {result.winner === 'tie'
              ? "It's a tie!"
              : `Player ${result.winner === 'player1' ? '1' : '2'} wins!`}
          </h2>
          <p className="result-explanation">{result.explanation}</p>
          <button onClick={resetGame} className="start-over-button">
            Next Round
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
