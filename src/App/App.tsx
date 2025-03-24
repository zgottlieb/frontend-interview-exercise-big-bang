import React, { useState } from 'react';
import automataLogo from '../assets/automata.png';
import Game from '../components/Game';
import Scoreboard from '../components/Scoreboard';
import './App.css';

const App: React.FC = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const updateScores = (winner: 'player1' | 'player2' | 'tie') => {
    if (winner === 'player1') setPlayer1Score(player1Score + 1);
    if (winner === 'player2') setPlayer2Score(player2Score + 1);
  };

  const startGame = () => {
    setGameActive(true);
  };

  return (
    <div className={`App ${gameActive ? 'active' : ''}`}>
      <div>
        <a href="https://automata.tech/" target="_blank">
          <img
            src={String(automataLogo)}
            className="logo automata"
            alt="Automata logo"
          />
        </a>
      </div>
      <h1>Rock, Paper, Scissors, Lizard, Spock</h1>
      <Scoreboard player1Score={player1Score} player2Score={player2Score} />
      {!gameActive ? (
        <button onClick={startGame} className="start-button">
          Start Round
        </button>
      ) : (
        <Game
          updateScores={updateScores}
          resetGame={() => setGameActive(false)}
        />
      )}
    </div>
  );
};

export default App;
