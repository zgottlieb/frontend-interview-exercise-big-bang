import React, { useState } from 'react';
import useGameContext from '../context/useGameContext';
import Game from './Game';

enum GameStep {
  Player1Turn = 'player1Turn',
  Player2Turn = 'player2Turn',
  Result = 'result',
}

const GameBoard: React.FC = () => {
  const { round, setRound, player1Name, player2Name, updateScores } =
    useGameContext();
  const [gameStep, setGameStep] = useState<GameStep | null>(null);

  const handleNextRound = () => {
    setRound((prev) => prev + 1);
    setGameStep(GameStep.Player1Turn);
  };

  const handleCancelRound = () => {
    setGameStep(null); // Reset to inactive state
  };

  if (!gameStep) {
    return (
      <div className="game-area">
        <div className="game-board-container">
          <div className="scoreboard-container">
            {/* Scoreboard will be rendered here */}
          </div>
          <div className="ready-container">
            <p className="game-on-text">Ready to Play?</p>
            <button
              onClick={() => setGameStep(GameStep.Player1Turn)}
              className="start-button"
            >
              Start Round
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-area game-on">
      <p className="game-on-text">Current Round: {round}</p>
      {gameStep === GameStep.Player1Turn && (
        <Game
          updateScores={updateScores}
          startNextRound={() => setGameStep(GameStep.Player2Turn)}
          player1Name={player1Name}
          player2Name={player2Name}
        />
      )}
      {gameStep === GameStep.Player2Turn && (
        <Game
          updateScores={updateScores}
          startNextRound={() => setGameStep(GameStep.Result)}
          player1Name={player1Name}
          player2Name={player2Name}
        />
      )}
      {gameStep === GameStep.Result && (
        <div>
          <p>Result of the round is displayed here.</p>
          <button onClick={handleNextRound} className="start-over-button">
            Next Round
          </button>
          <button onClick={handleCancelRound} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
