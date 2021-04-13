import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows =6, ncols =6, chanceLightStartsOn=.2  }) {
  const [board, setBoard] = useState(createBoard());
  // debugger;
  

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      initialBoard.push(Array.from ({ length: ncols}, () => Math.random() > chanceLightStartsOn ? true : false))
    }
    return initialBoard;
  }

  function hasWon() {
    //Check the board in state to determine whether the player has won.
    debugger;
    // Use of row and cell ??
    const gameStatus = board.every(row => row.every(cell => !cell));
    return gameStatus;
  }

  function flipCellsAround(coord) {
    // debugger;

    // Use of oldBoard here????  Value of oldBoard???
    setBoard(oldBoard => {

      // Using .map(Number) ?????
      const [y, x] = coord.split("-").map(Number);

      // debugger;

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

     
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
    // if the game is won, just show a winning msg & render nothing else
    if (hasWon()) {
      return <div>You Win!</div>;
    }

 
  // make table board
  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      // debugger;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
}

export default Board;
