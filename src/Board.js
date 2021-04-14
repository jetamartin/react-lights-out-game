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
 
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      initialBoard.push(Array.from ({ length: ncols}, () => Math.random() < chanceLightStartsOn ))
    }
    return initialBoard;
  }

  //Check the board in state to determine whether the player has won. All board cells contain "false" value
  function hasWon() {
  
   // The every() method tests whether all elements in the array pass the test implemented by the provided function.
    // If the test passes for all values in the array then it returns True otherwise if even one value in the array fails 
    // the test it will return false. 
    // Board is an array of arrays [[], [], [], etc]. So the row references an array inside the array.
    // And the cell references a single element inside of the row array
    // The nested use of the .every() allows you to test every element inside of each array. 
    // Kind of the equivalent of nested for loops. 

    return board.every(row => row.every(cell => !cell));
   }

  function flipCellsAround(coord) {
    // If the new state is computed using the previous state, you can pass a function to setState
    // So in this case oldBoard represents the prior state value.The boardCopy returned value from the function passed
    // in will represent the "new" state value
    setBoard(oldBoard => {

      // Convert the coord string "y - x" (e.g., "2-6") to [2,6] by removing "-" 
      // and then converting string ("3") into numbers via Number() function.
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a "deep" copy of the oldBoard
      // A copy is made to avoid re-renders each time you are modifying the board. Changes are made to the boardcopy and
      // when that is copy is returned it becomes the new board state and re-renders occur once based on the new values. 
      const boardCopy = oldBoard.map(row => [...row]);

      // Flip the selected/click on cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // Returning the boardCopy results in the state being set to the values in boardCopy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
    // if the game is won, just show a winning msg & render nothing else
    if (hasWon()) {
      return <div>You Win!</div>;
    }

 
  // make table board using HTML table structure (e.g., <tr> & <td>]
  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
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
