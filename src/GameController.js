const Player = require('./PlayerClass');
const Ship = require('./ShipClass');

class GameController {
    constructor () {
        this.playerOne = new Player('player');
        this.playerTwo = new Player('computer');
        this.currentPlayer = this.playerOne;
    }

    startGame() {
        this.playerOne.board.placeShip(new Ship('Carrier', 5), 7, 0, 'vertical');
        this.playerOne.board.placeShip(new Ship('Battleship', 4), 0, 0, 'horizontal');
        this.playerOne.board.placeShip(new Ship('Destroyer', 3), 5, 3, 'vertical');
        this.playerOne.board.placeShip(new Ship('Submarine', 3), 3, 7, 'horizontal');
        this.playerOne.board.placeShip(new Ship('Patrol', 2), 7, 9, 'vertical');

        this.playerTwo.board.placeShip(new Ship('Carrier', 5), 7, 0, 'vertical');
        this.playerTwo.board.placeShip(new Ship('Battleship', 4), 0, 0, 'horizontal');
        this.playerTwo.board.placeShip(new Ship('Destroyer', 3), 5, 3, 'vertical');
        this.playerTwo.board.placeShip(new Ship('Submarine', 3), 3, 7, 'horizontal');
        this.playerTwo.board.placeShip(new Ship('Patrol', 2), 7, 9, 'vertical');
    }

    switchTurn() {
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
        } else {
            this.currentPlayer = this.playerOne;
        }
    }

    gameOver () {
        return this.playerOne.board.isAllShipsSunk() || this.playerTwo.board.isAllShipsSunk();
    }

    computerTurn () {
        let [row, column] = this.playerTwo.computerShot();
        while (!this.playerOne.board.isValid(row, column)) {
            [row, column] = this.playerTwo.computerShot()
        }
        this.playerOne.board.receiveAttack(row, column);
    }
}






module.exports = GameController;