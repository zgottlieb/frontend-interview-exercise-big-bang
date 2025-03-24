import React from 'react';
import automataLogo from '../assets/automata.png';
import Game from '../components/Game';
import Scoreboard from '../components/Scoreboard';
import { useSessionStorage } from '../hooks/useSessionStorage';
import './App.css';

const App: React.FC = () => {
  const [player1Score, setPlayer1Score] = useSessionStorage<number>(
    'player1Score',
    0
  );
  const [player2Score, setPlayer2Score] = useSessionStorage<number>(
    'player2Score',
    0
  );
  const [gameActive, setGameActive] = useSessionStorage<boolean>(
    'gameActive',
    false
  );

  const updateScores = (winner: 'player1' | 'player2' | 'tie') => {
    if (winner === 'player1') setPlayer1Score(player1Score + 1);
    if (winner === 'player2') setPlayer2Score(player2Score + 1);
  };

  const startGame = () => {
    setGameActive(true);
  };

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameActive(false);
    sessionStorage.clear();
  };

  return (
    <div className={`App ${gameActive ? 'active' : ''}`}>
      <header className="header">
        <a href="https://automata.tech/" target="_blank">
          <img
            src={String(automataLogo)}
            className="logo automata"
            alt="Automata logo"
          />
        </a>
        <h1>Rock, Paper, Scissors, Lizard, Spock</h1>
      </header>
      <div className="main-content">
        <div className="scoreboard-container">
          <Scoreboard player1Score={player1Score} player2Score={player2Score} />
          <button onClick={resetGame} className="reset-button">
            Reset Game
          </button>
        </div>
        <div className={`game-area ${gameActive ? 'game-on' : ''}`}>
          <p className="game-on-text">
            {gameActive ? 'Game On!' : 'Ready to Play?'}
          </p>
          <div className="game-content">
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
        </div>
      </div>
    </div>
  );
};

export default App;
