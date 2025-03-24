import React, { useState } from 'react';
import { determineWinner } from '../utils/gameLogic';
import Button from './Button';

interface GameProps {
  updateScores: (winner: 'player1' | 'player2' | 'tie') => void;
}

const Game: React.FC<GameProps> = ({ updateScores }) => {
  const [player1Choice, setPlayer1Choice] = useState<string | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<string | null>(null);

  const choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];

  const handlePlay = () => {
    if (player1Choice && player2Choice) {
      const winner = determineWinner(player1Choice, player2Choice);
      updateScores(winner);
      setPlayer1Choice(null);
      setPlayer2Choice(null);
    }
  };

  return (
    <div>
      <div>
        <h2>Player 1</h2>
        {choices.map((choice) => (
          <Button key={choice} onClick={() => setPlayer1Choice(choice)}>
            {choice}
          </Button>
        ))}
      </div>
      <div>
        <h2>Player 2</h2>
        {choices.map((choice) => (
          <Button key={choice} onClick={() => setPlayer2Choice(choice)}>
            {choice}
          </Button>
        ))}
      </div>
      <button onClick={handlePlay} disabled={!player1Choice || !player2Choice}>
        Play
      </button>
    </div>
  );
};

export default Game;
