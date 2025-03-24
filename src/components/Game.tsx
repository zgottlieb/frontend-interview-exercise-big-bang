import React, { useState } from 'react';
import { icons } from '../assets/icons';
import { useGameResult } from '../hooks/useGameResult';
import { Choice } from '../types';
import Button from './Button';

const Game: React.FC<{
  updateScores: (winner: 'player1' | 'player2' | 'tie') => void;
  startNextRound: () => void;
  player1Name: string;
  player2Name: string;
}> = ({ updateScores, startNextRound, player1Name, player2Name }) => {
  const [player1Choice, setPlayer1Choice] = useState<Choice | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<Choice | null>(null);
  const [step, setStep] = useState(1);
  const { result, calculateResult, resetResult } = useGameResult();

  const choices: Choice[] = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];

  const toggleChoice = (
    choice: Choice,
    setChoice: React.Dispatch<React.SetStateAction<Choice | null>>
  ) => {
    setChoice((prevChoice) => (prevChoice === choice ? null : choice));
  };

  const handleReveal = () => {
    if (player1Choice && player2Choice) {
      const winner = calculateResult(player1Choice, player2Choice);
      updateScores(winner);
      setStep(4); // Show the result
    }
  };

  const handleNextRound = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    resetResult();
    setStep(1); // Ensure step is reset to 1 for Player 1's turn
    startNextRound();
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>{player1Name}, make your choice</h2>
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
          <h2>{player2Name}, make your choice</h2>
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
            onClick={handleReveal}
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
          <button onClick={handleNextRound} className="start-over-button">
            Next Round
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
