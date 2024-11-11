class Cell {
    constructor(row, column, player) {
        this.row = row;
        this.column = column;
        this.player = player;
        this.isShipCell = false;
        this.isHit = false;
    }
}

class GameBoard {
    constructor(player) {
        this.grid = this.createGrid(player);
        this.ships = [];
        this.player = player;
    }

    createGrid(player) {
        let grid = [];
        for (let row = 0; row <= 9; row++) {
            let fullRow = [];
            for (let column = 0; column <= 9; column++) {
                const square = new Cell(row, column, player);
                fullRow.push(square);
            }
            grid.push(fullRow);
        }
        return grid;
    }

    isValid(row, column) {
        if (row >= 0 && row <= 9 && column >= 0 && column <= 9 && !this.grid[row][column].isHit) {
            return true;
        }  else {
            return false;
        }
    }

    placeShip(ship, row, column, direction) {
        if (!this.isValid(row, column)) {
            return false;
        }
        if (direction === "horizontal") {
            if (!this.isValid(row, column + ship.length-1)) {
                return false;
            }
            for (let i = 0; i < ship.length; i++) {
                this.grid[row][column].isShipCell = true;
                this.grid[row][column].ship = ship;
                column++;
            }
        }
        if (direction === "vertical") {
            if (!this.isValid(row - ship.length-1, column)) {
                return false;
            }
            for (let i = 0; i < ship.length; i++) {
                this.grid[row][column].isShipCell = true;
                this.grid[row][column].ship = ship;
                row--;
            }
        }
        this.ships.push(ship);
    }

    receiveAttack(row, column) {
        if (!this.isValid(row, column)) {
            return false;
        }
        const cell = this.grid[row][column];
        if (!cell.isHit) {
            cell.isHit = true;
            if (cell.isShipCell) {
                cell.ship.hit();
            }
        }
    }
    shipsSinkCheck() {
        for (let ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
    isAllShipsSunk() {
        if (this.shipsSinkCheck()) {
            return true;
        }
        return false;
    }
}

module.exports = GameBoard;
