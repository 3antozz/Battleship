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
}






module.exports = GameController;