import React from 'react';

interface ScoreboardProps {
  player1Score: number;
  player2Score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  player1Score,
  player2Score,
}) => {
  return (
    <div className="scoreboard">
      <h2>Score</h2>
      <div className="score-container">
        <div className="score">
          <span className="label">Player 1</span>
          <span className="value">{player1Score}</span>
        </div>
        <div className="score">
          <span className="label">Player 2</span>
          <span className="value">{player2Score}</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
