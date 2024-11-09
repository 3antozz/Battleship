const Player = require('../PlayerClass');
const realPlayer = new Player('player');
const computer =  new Player('computer');

describe('Test player instances', () => {
    test('player type', () => {
        expect(realPlayer.type).toBe('player');
        expect(computer.type).toBe('computer');
    })
    test ('players boards', () => {
        expect(realPlayer.board).toBeDefined();
        expect(computer.board).toBeDefined();
    })
})