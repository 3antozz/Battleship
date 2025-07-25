const Player = require("./PlayerClass");
const Ship = require("./ShipClass");

class GameController {
    constructor(DOM) {
        this.playerOne = new Player("player");
        this.playerTwo = new Player("computer");
        this.currentPlayer = this.playerOne;
        this.cpuQueue = [];
        this.cpuMissCoords = [];
        this.firstHit = null;
        this.direction = false;
        this.DOMdirection = "horizontal";
        this.currentShipIndex = 0;
        this.placementAllowed = false;
        this.DOM = DOM;
        this.computerTurnResult = null;
        this.currentShipPlacement = 5;
    }

    createNewPlayer() {
        this.playerOne = new Player("player");
        this.currentPlayer = this.playerOne;
    }

    startGame() {
        this.randomizeShipsPlacement(this.playerTwo.board);
    }

    switchTurn() {
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
        } else {
            this.currentPlayer = this.playerOne;
        }
    }

    gameOver() {
        if (this.playerOne.board.isAllShipsSunk()) {
            this.winner = "Computer";
            return true;
        } else if (this.playerTwo.board.isAllShipsSunk()) {
            this.winner = "You";
            return true;
        } else {
            return false;
        }
    }

    cpuAlgo() {
        if (this.cpuQueue.length === 0) {
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            while (!this.playerOne.board.isInGrid(row, column)) {
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10);
            }
            if (this.playerOne.board.grid[row][column].isShipCell) {
                this.firstHit = [row, column];
                this.playerOne.board.grid[row][column]
                    .getOrthogonalCells()
                    .forEach((coords) => {
                        this.cpuQueue.push(coords);
                    });
            }
            this.cpuMissCoords = [row, column];
            return this.playerOne.board.receiveAttack(row, column);
        } else {
            let [row, column] = this.cpuQueue.shift();
            if (this.playerOne.board.grid[row][column].isHit) {
                return this.cpuAlgo();
            }
            if (this.playerOne.board.grid[row][column].isShipCell) {
                if (row === this.firstHit[0]) {
                    if (!this.direction) {
                        this.cpuQueue.length = 0;
                        this.direction = true;
                        this.playerOne.board.grid[this.firstHit[0]][
                            this.firstHit[1]
                        ]
                            .getHorizontalCells()
                            .forEach((coords) => {
                                this.cpuQueue.push(coords);
                            });
                    }
                    this.playerOne.board.grid[row][column]
                        .getHorizontalCells()
                        .forEach((coords) => {
                            this.cpuQueue.push(coords);
                        });
                } else if (column === this.firstHit[1]) {
                    if (!this.direction) {
                        this.cpuQueue.length = 0;
                        this.direction = true;
                        this.playerOne.board.grid[this.firstHit[0]][
                            this.firstHit[1]
                        ]
                            .getVerticalCells()
                            .forEach((coords) => {
                                this.cpuQueue.push(coords);
                            });
                    }
                    this.playerOne.board.grid[row][column]
                        .getVerticalCells()
                        .forEach((coords) => {
                            this.cpuQueue.push(coords);
                        });
                }
                this.cpuMissCoords = [row, column];
                const result = this.playerOne.board.receiveAttack(row, column);
                if (result === "Ship has Sunk!") {
                    this.firstHit = null;
                    this.direction = false;
                    this.cpuQueue.length = 0;
                    return result;
                }
                return result;
            } else {
                this.cpuMissCoords = [row, column];
                return this.playerOne.board.receiveAttack(row, column);
            }
        }
    }

    changeDOMDirection() {
        this.DOMdirection =
            this.DOMdirection === "horizontal" ? "vertical" : "horizontal";
    }

    randomizeShipsPlacement(board) {
        const ships = [
            new Ship("Carrier", 5),
            new Ship("Battleship", 4),
            new Ship("Destroyer", 3),
            new Ship("Submarine", 3),
            new Ship("Patrol", 2),
        ];
        for (let ship of ships) {
            let direction = Math.floor(Math.random() * 2);
            direction = direction === 1 ? "vertical" : "horizontal";
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            while (
                board.CheckShipPlacement(ship, row, column, direction) === false
            ) {
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10);
            }
            board.placeShip(ship, row, column, direction);
        }
        return true;
    }

    handleMouseOver(event) {
        const ships = [
            new Ship("Carrier", 5),
            new Ship("Battleship", 4),
            new Ship("Destroyer", 3),
            new Ship("Submarine", 3),
            new Ship("Patrol", 2),
        ];
        if (this.playerOne.board.ships.length === 5) {
            return;
        }
        if (this.playerOne.board.ships.length === 0) {
            this.currentShipIndex = 0;
        }
        const ship = ships[this.currentShipIndex];
        const direction = this.DOMdirection;
        const cell = [event.target.dataset.row, event.target.dataset.column];
        if (
            this.playerOne.board.CheckShipPlacement(
                ship,
                +cell[0],
                +cell[1],
                direction,
            )
        ) {
            this.placementAllowed = true;
            this.DOM.highlightShip(event.target, ship.length, direction);
        } else {
            this.placementAllowed = false;
            this.DOM.badShipPlacement(event.target, ship.length, direction);
        }
    }

    handleClick(event) {
        const ships = [
            new Ship("Carrier", 5),
            new Ship("Battleship", 4),
            new Ship("Destroyer", 3),
            new Ship("Submarine", 3),
            new Ship("Patrol", 2),
        ];
        if (this.playerOne.board.ships.length === 5) {
            return;
        }
        if (this.playerOne.board.ships.length === 0) {
            this.currentShipIndex = 0;
        }
        const ship = ships[this.currentShipIndex];
        const direction = this.DOMdirection;
        const cell = [event.target.dataset.row, event.target.dataset.column];
        if (this.placementAllowed) {
            this.playerOne.board.placeShip(ship, +cell[0], +cell[1], direction);
            this.DOM.renderGrid(this.playerOne.board.grid);
            this.DOM.animateCell("player", cell[0], cell[1]);
            this.DOM.currentShip(`ship${this.currentShipPlacement-this.currentShipIndex}`);
            this.currentShipIndex++;
            this.DOM.shipIndicator(this.currentShipPlacement-this.currentShipIndex);
        } else {
            return;
        }
    }

    handleAttack(event) {
        if (!this.gameOver() && this.currentPlayer.type === "player") {
            this.DOM.renderTurnStatus(this.playerOne.type);
            const cell = [
                event.target.dataset.row,
                event.target.dataset.column,
            ];
            const playerTurn = this.playerTwo.board.receiveAttack(
                cell[0],
                cell[1],
            );
            if (playerTurn === false) {
                return;
            }
            if (this.gameOver()) {
                this.DOM.renderWinner(`${this.winner} Won!`);
                this.DOM.showDialog(this.winner);
                this.DOM.updateShipCount(
                    this.playerTwo.board.shipsLeftCount(),
                    "computer",
                );
            }
            if (!this.playerTwo.board.grid[cell[0]][cell[1]].isShipCell) {
                this.switchTurn();
                this.DOM.renderGrid(this.playerTwo.board.grid);
                this.DOM.animateCell("computer", event.target.dataset.row, event.target.dataset.column);
                if (!this.gameOver()) {
                    this.DOM.renderTurnStatus(this.playerTwo.type);
                    this.DOM.enableOverlay("player");
                    setTimeout(() => this.computerPlay(), 800);
                } else {
                    return;
                }
            } else {
                if(playerTurn === "Ship has Sunk!") {
                    this.DOM.updateShipCount(
                    this.playerTwo.board.shipsLeftCount(),
                    "computer",
                    );
                }
                this.DOM.renderGrid(this.playerTwo.board.grid);
                this.DOM.animateCell("computer", event.target.dataset.row, event.target.dataset.column);
            }
        } else {
            return;
        }
    }

    computerPlay() {
        this.computerTurnResult = this.cpuAlgo();
        this.DOM.renderTurnStatus(this.playerTwo.type);
        this.DOM.enableOverlay("player");
        this.DOM.renderGrid(this.playerOne.board.grid);
        this.DOM.animateCell("player", this.cpuMissCoords[0], this.cpuMissCoords[1]);
        if (this.gameOver()) {
            this.DOM.renderWinner(`${this.winner} Won!`);
            this.DOM.showDialog(this.winner);
            this.DOM.updateShipCount(
                this.playerOne.board.shipsLeftCount(),
                "player",
            );
        }
        if (
            (!this.gameOver() &&
                this.computerTurnResult === "Ship has Sunk!") ||
            (!this.gameOver() && this.computerTurnResult === "Hit!")
        ) {
            if(this.computerTurnResult === "Ship has Sunk!") {
                this.DOM.updateShipCount(
                this.playerOne.board.shipsLeftCount(),
                "player",
                );
            }
            setTimeout(() => this.computerPlay(), 800);
        } else {
            if(!this.gameOver()) {
                this.DOM.renderTurnStatus(this.playerOne.type);
                this.DOM.enableOverlay("computer");
            }
            this.switchTurn();
        }
    }
}

module.exports = GameController;
