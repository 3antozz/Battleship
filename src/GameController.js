const Player = require('./PlayerClass');
const Ship = require('./ShipClass');

class GameController {
    constructor () {
        this.playerOne = new Player('player');
        this.playerTwo = new Player('computer');
        this.currentPlayer = this.playerOne;
        this.cpuQueue = [];
        this.firstHit = null;
        this.direction = false;
    }

    startGame() {
        // this.playerOne.board.placeShip(new Ship('Carrier', 5), 7, 0, 'vertical');
        // this.playerOne.board.placeShip(new Ship('Battleship', 4), 0, 0, 'horizontal');
        // this.playerOne.board.placeShip(new Ship('Destroyer', 3), 5, 3, 'vertical');
        // this.playerOne.board.placeShip(new Ship('Submarine', 3), 3, 7, 'horizontal');
        // this.playerOne.board.placeShip(new Ship('Patrol', 2), 7, 9, 'vertical');
        this.randomizeShipsPlacement(this.playerOne.board);
        this.randomizeShipsPlacement(this.playerTwo.board);
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
        if (this.cpuQueue.length === 0) {
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            while (!this.playerOne.board.isInGrid(row, column)) {
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10);
            }
            if (this.playerOne.board.grid[row][column].isShipCell){
                this.firstHit = [row, column];
                this.playerOne.board.grid[row][column].getOrthogonalCells().forEach((coords) => {
                    this.cpuQueue.push(coords);
                })
            }
            return this.currentPlayer.board.receiveAttack(row, column);
        } else {
            let [row, column] = this.cpuQueue.shift();
            if (this.playerOne.board.grid[row][column].isHit) {
                return this.computerTurn();
            }
            if (this.playerOne.board.grid[row][column].isShipCell){
                if (row === this.firstHit[0]) {
                    if (!this.direction) {
                        this.cpuQueue.length = 0;
                        this.direction = true;
                        this.playerOne.board.grid[this.firstHit[0]][this.firstHit[1]].getHorizontalCells().forEach((coords) => {
                        this.cpuQueue.push(coords);
                        })
                    }
                    this.playerOne.board.grid[row][column].getHorizontalCells().forEach((coords) => {
                    this.cpuQueue.push(coords);
                    })
                } else if (column === this.firstHit[1]) {
                    if (!this.direction) {
                        this.cpuQueue.length = 0;
                        this.direction = true;
                        this.playerOne.board.grid[this.firstHit[0]][this.firstHit[1]].getVerticalCells().forEach((coords) => {
                        this.cpuQueue.push(coords);
                        })
                    }
                    this.playerOne.board.grid[row][column].getVerticalCells().forEach((coords) => {
                        this.cpuQueue.push(coords);
                    })
                }
                this.playerOne.board.receiveAttack(row, column);
                if (this.playerOne.board.grid[row][column].ship.isSunk()) {
                    this.firstHit = null;
                    this.direction = false;
                    this.cpuQueue.length = 0;
                    return 'Sunk Ship!';
                }
                return 'Hit!'
            } else {
                return this.playerOne.board.receiveAttack(row, column);
            }
        }
    }

    randomizeShipsPlacement (board) {
        const ships = [new Ship('Carrier', 5), new Ship('Battleship', 4), new Ship('Destroyer', 3), new Ship('Submarine', 3), new Ship('Patrol', 2) ];
        for (let ship of ships) {
            let direction = Math.floor(Math.random() * 2);
            direction = direction === 1 ? 'vertical' : 'horizontal';
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            while (board.placeShip(ship, row, column, direction) === false) {
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10);
            }
        }
        
    }

}






module.exports = GameController;