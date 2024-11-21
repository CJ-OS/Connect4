const { dropPiece, checkWinner, createBoard, getBoard } = require('../connect_four'); // Adjust the path as necessary

describe('Connect Four Game Logic', () => {
    beforeEach(() => {
        createBoard(); // Reset the board before each test
    });

    test('should drop a piece in the correct column', () => {
        dropPiece(0, 1);
        expect(getBoard()[5][0]).toBe(1); // Use getBoard() to access the board
    });

    test('should not drop a piece in a full column', () => {
        for (let i = 0; i < 6; i++) {
            dropPiece(0, 1);
        }
        expect(dropPiece(0, 1)).toBe(false); // Column is full
    });

    test('should detect a horizontal win', () => {
        dropPiece(0, 1);
        dropPiece(1, 1);
        dropPiece(2, 1);
        dropPiece(3, 1);
        expect(checkWinner(1)).toBe(true);
    });

    test('should detect a vertical win', () => {
        dropPiece(0, 1);
        dropPiece(0, 1);
        dropPiece(0, 1);
        dropPiece(0, 1);
        expect(checkWinner(1)).toBe(true);
    });

    test('should detect a diagonal win (top-left to bottom-right)', () => {
        dropPiece(0, 1);
        dropPiece(1, 2);
        dropPiece(1, 1);
        dropPiece(2, 2);
        dropPiece(2, 1);
        dropPiece(3, 2);
        dropPiece(3, 1);
        dropPiece(4, 1);
        expect(checkWinner(1)).toBe(true);
    });

    test('should detect a diagonal win (top-right to bottom-left)', () => {
        dropPiece(3, 1);
        dropPiece(4, 2);
        dropPiece(4, 1);
        dropPiece(5, 2);
        dropPiece(5, 1);
        dropPiece(6, 2);
        dropPiece(5, 1);
        dropPiece(4, 1);
        dropPiece(3, 1);
        expect(checkWinner(1)).toBe(true);
    });

   
});