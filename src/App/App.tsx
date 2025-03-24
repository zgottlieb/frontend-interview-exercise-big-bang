import React, { useState } from 'react';
import automataLogo from '../assets/automata.png';
import Game from '../components/Game';
import Scoreboard from '../components/Scoreboard';
import Settings from '../components/Settings';
import { useGameContext } from '../context/GameContext';
import './App.css';

const App: React.FC = () => {
  const {
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    setPlayer1Score,
    setPlayer2Score,
    round,
    setRound,
    resetGame,
  } = useGameContext();
  const [gameActive, setGameActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const updateScores = (winner: 'player1' | 'player2' | 'tie') => {
    if (winner === 'player1') setPlayer1Score((prev) => prev + 1);
    if (winner === 'player2') setPlayer2Score((prev) => prev + 1);
  };

  const startGame = () => setGameActive(true);

  const handleNextRound = () => {
    setRound((prev) => prev + 1);
    setGameActive(true);
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
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="settings-button"
        >
          {showSettings ? 'Back to Game' : 'Settings'}
        </button>
      </header>
      {showSettings ? (
        <Settings />
      ) : (
        <div className="main-content">
          <div className="scoreboard-container">
            <Scoreboard
              player1Name={player1Name}
              player2Name={player2Name}
              player1Score={player1Score}
              player2Score={player2Score}
            />
          </div>
          <div className={`game-area ${gameActive ? 'game-on' : ''}`}>
            <p className="game-on-text">
              {gameActive ? `Current Round: ${round}` : 'Ready to Play?'}
            </p>
            <div className="game-content">
              {!gameActive ? (
                <button onClick={startGame} className="start-button">
                  Start Round
                </button>
              ) : (
                <Game
                  updateScores={updateScores}
                  startNextRound={handleNextRound}
                  player1Name={player1Name}
                  player2Name={player2Name}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
