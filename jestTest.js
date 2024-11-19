const { Builder, By } = require('jest-w');
jest.setTimeout(30000);  
let driver;
beforeAll(async () => {
    
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000');  
});
afterAll(async () => {
    
    await driver.quit();
});
test('should allow a player to drop a piece', async () => {
    const cell = await driver.findElement(By.css('.column:nth-child(1)')); 
    await cell.click();

    
    const piece = await driver.findElement(By.css('.piece')).isDisplayed();
    expect(piece).toBe(true);
});
test('should detect a win condition', async () => {
    const cells = await driver.findElements(By.css('.column .cell'));  

    
    await cells[0].click();  
    await cells[1].click();  
    
    const winMessage = await driver.findElement(By.css('.win-message')).getText();
    expect(winMessage).toBe('Player 1 wins!');
});