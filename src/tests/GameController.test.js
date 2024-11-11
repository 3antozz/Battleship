const GameController = require ('../GameController');
const gameControl = new GameController();
gameControl.startGame();


describe ('test game start', () => {
    test('first player turn', () => {
        expect(gameControl.currentPlayer).toBe(gameControl.playerOne)
    });
    test('boards creation', () => {
        expect(gameControl.playerOne.board).toBeDefined();
        expect(gameControl.playerTwo.board).toBeDefined();
    })
})

describe ('turn switch', () => {
    test ('turn switch', () => {
        gameControl.playerTwo.board.receiveAttack(0, 1);
        gameControl.switchTurn();
        expect(gameControl.currentPlayer).toBe(gameControl.playerTwo);
    })
    test ('turn switch', () => {
        gameControl.playerOne.board.receiveAttack(0, 1);
        gameControl.switchTurn();
        expect(gameControl.currentPlayer).toBe(gameControl.playerOne);
    })
})

describe ('win condition test', () => {
    test ('not all ships hit', () => {
        gameControl.playerTwo.board.receiveAttack(0, 0);
        gameControl.playerTwo.board.receiveAttack(0, 1);
        gameControl.playerTwo.board.receiveAttack(0, 2);
        gameControl.playerTwo.board.receiveAttack(0, 4);

        expect(gameControl.gameOver()).toBeFalsy();

    })
    test ('hit all ships', () => {
        gameControl.playerTwo.board.receiveAttack(0, 0);
        gameControl.playerTwo.board.receiveAttack(0, 1);
        gameControl.playerTwo.board.receiveAttack(0, 2);
        gameControl.playerTwo.board.receiveAttack(0, 3);

        gameControl.playerTwo.board.receiveAttack(3, 0);
        gameControl.playerTwo.board.receiveAttack(4, 0);
        gameControl.playerTwo.board.receiveAttack(5, 0);
        gameControl.playerTwo.board.receiveAttack(6, 0);
        gameControl.playerTwo.board.receiveAttack(7, 0);

        gameControl.playerTwo.board.receiveAttack(3, 3);
        gameControl.playerTwo.board.receiveAttack(4, 3);
        gameControl.playerTwo.board.receiveAttack(5, 3);

        gameControl.playerTwo.board.receiveAttack(3, 7);
        gameControl.playerTwo.board.receiveAttack(3, 8);
        gameControl.playerTwo.board.receiveAttack(3, 9);

        gameControl.playerTwo.board.receiveAttack(6, 9);
        gameControl.playerTwo.board.receiveAttack(7, 9);

        expect(gameControl.gameOver()).toBeTruthy();
    })
})

