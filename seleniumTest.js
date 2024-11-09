const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Connect Four Game Tests', function() {
  this.timeout(30000);  // Set a longer timeout for Selenium tests

  let driver;

  before(async function() {
    // Start the browser
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000');  // Assuming the app is running locally
  });

  after(async function() {
    // Close the browser after tests
    await driver.quit();
  });

  it('should allow a player to drop a piece', async function() {
    const cell = await driver.findElement(By.css('.column:nth-child(1)'));  // Select first column
    await cell.click();

    // Assert that the piece was dropped (this is a simple example, adjust according to the app's behavior)
    const piece = await driver.findElement(By.css('.piece')).isDisplayed();
    assert.strictEqual(piece, true);
  });

  it('should detect a win condition', async function() {
    const cells = await driver.findElements(By.css('.column .cell'));  // Select all cells
    // Code to simulate moves to trigger a win (for simplicity, using a single click)
    await cells[0].click();  // Simulate drop
    await cells[1].click();  // Simulate another drop

    // Check for win (adjust according to your app's logic)
    const winMessage = await driver.findElement(By.css('.win-message')).getText();
    assert.strictEqual(winMessage, 'Player 1 wins!');
  });
});
