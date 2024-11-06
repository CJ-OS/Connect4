// test/seleniumTest.js
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Connect Four Game Tests', function() {
  before(async function() {
    // Initialize board before each test
    createBoard();
  });

  it('should allow a player to drop a piece', function() {
    const player = 1;
    const column = 0;
    const result = dropPiece(column, player);
    assert.strictEqual(result, true, "Piece should be dropped successfully");
  });

  it('should detect a win condition', function() {
    const player = 1;
    // Simulate a win by dropping pieces
    dropPiece(0, player);
    dropPiece(1, player);
    dropPiece(2, player);
    dropPiece(3, player);
    assert.strictEqual(checkWinner(player), true, "Player should have won");
  });

  after(async function() {
    // Reset the board or clean up if necessary
    board.length = 0; // clear board for next test
  });
});
