// game.js
const board = [];
const rows = 6;
const cols = 7;
const winningLength = 4;

function createBoard() {
  for (let i = 0; i < rows; i++) {
    board.push(Array(cols).fill(0));
  }
}

function printBoard() {
  for (let row = 0; row < rows; row++) {
    let rowStr = "";
    for (let col = 0; col < cols; col++) {
      rowStr += board[row][col] === 0 ? " | " : `${board[row][col]} | `;
    }
    console.log(rowStr);
  }
}

function dropPiece(col, player) {
  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = player;
      return true;
    }
  }
  return false;
}

function checkWinner(player) {
  // Check horizontal
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols - winningLength + 1; col++) {
      if (board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player) {
        return true;
      }
    }
  }

  // Check vertical
  for (let row = 0; row < rows - winningLength + 1; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player) {
        return true;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row < rows - winningLength + 1; row++) {
    for (let col = 0; col < cols - winningLength + 1; col++) {
      if (board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player) {
        return true;
      }
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row < rows - winningLength + 1; row++) {
    for (let col = winningLength - 1; col < cols; col++) {
      if (board[row][col] === player &&
          board[row + 1][col - 1] === player &&
          board[row + 2][col - 2] === player &&
          board[row + 3][col - 3] === player) {
        return true;
      }
    }
  }

  return false;
}

module.exports = { createBoard, dropPiece, checkWinner, board };
