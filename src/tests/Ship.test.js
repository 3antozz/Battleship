const Ship = require('../ShipClass');

test('Test ship class', () => {
    const ship = new Ship('TEST', 5);
    expect(ship.length).toBe(5);
})

test('Test ship hit method', () => {
    const ship = new Ship('TEST', 5);
    ship.hit()
    expect(ship.hits).toBe(1);
})

test('Test ship is sunk method', () => {
    const ship = new Ship('TEST', 2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
})