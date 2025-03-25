import React, { useState } from 'react';
import useGameContext from '../context/useGameContext';

const Settings: React.FC = () => {
  const {
    player1Name,
    setPlayer1Name,
    player2Name,
    setPlayer2Name,
    resetGame,
  } = useGameContext();

  const [tempPlayer1Name, setTempPlayer1Name] = useState(player1Name);
  const [tempPlayer2Name, setTempPlayer2Name] = useState(player2Name);

  const handleSavePlayer1 = () => setPlayer1Name(tempPlayer1Name);
  const handleSavePlayer2 = () => setPlayer2Name(tempPlayer2Name);

  const handleReset = () => {
    resetGame();
    setTempPlayer1Name('Player 1');
    setTempPlayer2Name('Player 2');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings-field">
        <label htmlFor="player1Name">Player 1 Name:</label>
        <input
          id="player1Name"
          type="text"
          value={tempPlayer1Name}
          onChange={(e) => setTempPlayer1Name(e.target.value)}
        />
        <button
          onClick={handleSavePlayer1}
          disabled={tempPlayer1Name === player1Name}
          className="save-button"
        >
          Save
        </button>
      </div>
      <div className="settings-field">
        <label htmlFor="player2Name">Player 2 Name:</label>
        <input
          id="player2Name"
          type="text"
          value={tempPlayer2Name}
          onChange={(e) => setTempPlayer2Name(e.target.value)}
        />
        <button
          onClick={handleSavePlayer2}
          disabled={tempPlayer2Name === player2Name}
          className="save-button"
        >
          Save
        </button>
      </div>
      <button onClick={handleReset} className="reset-button">
        Reset All Game Settings
      </button>
    </div>
  );
};

export default Settings;
