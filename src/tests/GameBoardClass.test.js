const GameBoard = require('../GameBoardClass');
const Ship = require('../ShipClass');
const board = new GameBoard();
const Hship = new Ship('Warrior', 3);
const Vship = new Ship('Koko', 3);
board.placeShip(Hship, 2, 3, 'horizontal');
board.placeShip(Vship, 7, 7, 'vertical');



test ('test horizontal ship placement', () => {
    expect(board.grid[2][3].shipCell).toBeTruthy();
    expect(board.grid[2][4].shipCell).toBeTruthy();
    expect(board.grid[2][5].shipCell).toBeTruthy();
    expect(board.grid[2][6].shipCell).toBeFalsy();
    expect(board.grid[2][5].shipName).toBe('Warrior');
})

test ('test vertical ship placement', () => {
    expect(board.grid[7][7].shipCell).toBeTruthy();
    expect(board.grid[6][7].shipCell).toBeTruthy();
    expect(board.grid[5][7].shipCell).toBeTruthy();
    expect(board.grid[4][7].shipCell).toBeFalsy();
    expect(board.grid[5][7].shipName).toBe('Koko');
})

test ('Off grid ship placement', () => {
    expect(board.placeShip(Vship, -1, 11, 'vertical')).toBe('INSIDE THE GRID PLZ');
    expect(board.placeShip(Vship, 1, 1, 'vertical')).toBe('INSIDE THE GRID PLZ');
})

