const GameBoard = require('../GameBoardClass');
const Ship = require('../ShipClass');
const board = new GameBoard();
const Hship = new Ship('Warrior', 3);
const Vship = new Ship('Koko', 3);
board.placeShip(Hship, 2, 3, 'horizontal');
board.placeShip(Vship, 7, 7, 'vertical');
board.receiveAttack(7, 7);
board.receiveAttack(9, 9);


describe ('Ship Placement Method', () => {
    test ('test horizontal ship placement', () => {
        expect(board.grid[2][3].isShipCell).toBeTruthy();
        expect(board.grid[2][4].isShipCell).toBeTruthy();
        expect(board.grid[2][5].isShipCell).toBeTruthy();
        expect(board.grid[2][6].isShipCell).toBeFalsy();
        expect(board.grid[2][5].ship.name).toBe('Warrior');
    })
    
    test ('test vertical ship placement', () => {
        expect(board.grid[7][7].isShipCell).toBeTruthy();
        expect(board.grid[6][7].isShipCell).toBeTruthy();
        expect(board.grid[5][7].isShipCell).toBeTruthy();
        expect(board.grid[4][7].isShipCell).toBeFalsy();
        expect(board.grid[5][7].ship.name).toBe('Koko');
    })
    
    test ('Off grid ship placement', () => {
        expect(board.placeShip(Vship, -1, 11, 'vertical')).toBe('INSIDE THE GRID PLZ');
        expect(board.placeShip(Vship, 1, 1, 'vertical')).toBe('INSIDE THE GRID PLZ');
    })

    test ('ships array updated', () => {
        expect(board.ships.length).toBe(2);
    })
})

describe ('Attack test', () => {
    test('test if ship hitmark increased', () => {
        expect(board.grid[7][7].ship.hits).toBe(1);
    })

    test('test if missed shot is recorded', () => {
        expect(board.grid[9][9].isHit).toBeTruthy();
    })

    test('test off grid shot', () => {
        expect(board.receiveAttack(10, 10)).toBe('INSIDE THE GRID PLZ');
    })

    test('if ship is sunk', () => {
        board.receiveAttack(7, 7);
        board.receiveAttack(6, 7);
        board.receiveAttack(5, 7);
        board.receiveAttack(4, 7);
        expect(board.grid[7][7].ship.isSunk()).toBeTruthy();
    })

})

describe('win condition test', () => {
    test('all ships sunk', () => {
        board.receiveAttack(7, 7);
        board.receiveAttack(6, 7);
        board.receiveAttack(5, 7);
        board.receiveAttack(4, 7);
        board.receiveAttack(2, 3);
        board.receiveAttack(2, 4);
        board.receiveAttack(2, 5);
        expect(board.isAllShipsSunk()).toBeTruthy();
    })

    test('not all ships sunk', () => {
        const board2 = new GameBoard()
        expect(board2.isAllShipsSunk()).toBeFalsy();
    })
})
