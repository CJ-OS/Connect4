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
    console.clear();
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

// Helper to check a winning sequence
function checkSequence(startRow, startCol, deltaRow, deltaCol, player) {
    for (let i = 0; i < winningLength; i++) {
        const row = startRow + i * deltaRow;
        const col = startCol + i * deltaCol;
        if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] !== player) {
            return false;
        }
    }
    return true;
}

// Check for all directions
function checkDirection(player, deltaRow, deltaCol) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (checkSequence(row, col, deltaRow, deltaCol, player)) {
                return true;
            }
        }
    }
    return false;
}

function checkWinner(player) {
    // Check horizontal
    if (checkDirection(player, 0, 1)) return true;

    // Check vertical
    if (checkDirection(player, 1, 0)) return true;

    // Check diagonal (top-left to bottom-right)
    if (checkDirection(player, 1, 1)) return true;

    // Check diagonal (top-right to bottom-left)
    if (checkDirection(player, 1, -1)) return true;

    return false;
}

// Export the functions
module.exports = {
    createBoard,
    dropPiece,
    checkWinner,
    printBoard
};

//playGame(); uncomment to play game
