import { useState } from "react";

import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Log from "./components/Log/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver/GameOver.jsx";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "0";
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  let winner;
  const [gameTurns, setGameTurns] = useState([]);
  const [players , setPlayers] = useState({
    X : "player 1",
    0 : "player 2"
  })
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  function handleSelectSquare(rowInedx, colIndex) {
    // setActivePlayer((currentActive) => (currentActive === "X" ? "0" : "X"));
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowInedx, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }

  let gameBoard = [...initialGameBoard.map((eachElement) => [...eachElement])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstelement = gameBoard[combination[0].row][combination[0].column];
    const secondelement = gameBoard[combination[1].row][combination[1].column];
    const thirdelement = gameBoard[combination[2].row][combination[2].column];

    if (
      firstelement &&
      firstelement == secondelement &&
      firstelement == thirdelement
    ) {
      winner = players[firstelement];
    }
  }
  let checkDraw = true;
  gameBoard.map((eachEle) => {
    eachEle.map((eachRow) => {
      if (eachRow === null) {
        checkDraw = false;
      }
    });
  });
  const gameDraw = checkDraw && !winner;

  function restartHandler() {
    setGameTurns([]);
  }

  function handlePlayernameChange(symbol, newNmae){
    setPlayers((prevPlayers) =>{
      return {
        ...prevPlayers,
        [symbol] : newNmae
      }
    })

  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName = {handlePlayernameChange}
            />
          <Player
            initialName="player 2"
            symbol="0"
            isActive={activePlayer === "0"}
            onChangeName = {handlePlayernameChange}
          />
        </ol>
        {(winner || gameDraw) && (
          <GameOver winner={winner} onRestart={restartHandler} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
