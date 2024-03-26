import { useState } from "react";

import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Log from "./components/Log/Log.jsx";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowInedx, colIndex) {
    setActivePlayer((currentActive) => (currentActive === "X" ? "0" : "X"));
    setGameTurns((prevTurn) => {
      let currentPlayer = "X";
      if (prevTurn.length > 0 && prevTurn[0].player === "X") {
        currentPlayer = "0";
      }
      const updatedTurns = [
        { square: { row: rowInedx, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="player 2"
            symbol="0"
            isActive={activePlayer === "0"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns = {gameTurns}
        />
      </div>
      <Log turns = {gameTurns} />
    </main>
  );
}

export default App;
