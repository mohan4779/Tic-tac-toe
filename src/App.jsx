import { useState } from 'react';

import Player from './component/Player.jsx';
import GameBoard from './component/GameBoard.jsx';
import Log from './component/Log.jsx';
import GameOver from './component/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

    if(gameTurns.length > 0 && gameTurns[0].player === "X"){
      currentPlayer = "O";
    }

    return currentPlayer;
}

function App() {
  const [players, setPlayers]= useState({
    'X' : 'Player 1',
    'O' : "Player 2"
  });
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActiveplayer] = useState("X");

  const  activePlayer = deriveActivePlayer(gameTurns); 

  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns){
       const {squre, player} = turn;
       const {row, col} = squre;

       gameBoard[row][col] = player;
    }

    let winner ;

   for (const combination of WINNING_COMBINATIONS){
      const firstSqureSymbol =
      gameBoard[combination[0].row][combination[0].column];
      const secondSqureSymbol = 
      gameBoard[combination[1].row][combination[1].column];
      const thirdSqureSymbol = 
      gameBoard[combination[2].row][combination[2].column];

      if(
        firstSqureSymbol &&
        firstSqureSymbol === secondSqureSymbol &&
        firstSqureSymbol === thirdSqureSymbol
      ){
      winner = players[firstSqureSymbol];
      }
   } 

   const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSqure(rowIndex, colIndex){
    // setActiveplayer((curActiveplayer) => (curActiveplayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) =>{
      const currentPlayer = deriveActivePlayer(prevTurns);
    
      const updatedTurns = [
        {squre : {row : rowIndex, col : colIndex},player:currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  

  function handleRestart(){
    setGameTurns([]);
  }

function handlePlayerNameChange(symbol, newName){
  setPlayers(prevPlayers => {
    return{
      ...prevPlayers,
      [symbol] : newName
    }
  });
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1"
           symbol="X" 
           isActive={activePlayer === "X"}
           onChangeName={handlePlayerNameChange}
           />
          <Player initialName="player 2" 
          symbol="O" 
          isActive={activePlayer === "O"}
          onChangeName={handlePlayerNameChange}
          />
        </ol> 
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart}/>
          )}
        <GameBoard
        onSelectSqure={handleSelectSqure} 
        board={gameBoard}
        />  
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
