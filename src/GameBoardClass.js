class Cell {
    constructor(row, column, player) {
        this.row = row;
        this.column = column;
        this.player = player;
        this.isShipCell = false;
        this.isHit = false;
    }

    getOrthogonalCells() {
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        .map((coords) => [this.row + coords[0], this.column + coords[1]])
        .filter((coords) => this.isInGrid(coords[0], coords[1]));
        return directions;
    }

    getAdjacentCells() {
        const directions = [[0, 1], [1, 0],[0, -1], [1, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]
        .map((coords) => [this.row + coords[0], this.column + coords[1]])
        .filter((coords) => this.isInGrid(coords[0], coords[1]));
        return directions;
    }

    

    getVerticalCells() {
        const directions = [[1, 0], [-1, 0]]
        .map((coords) => [this.row + coords[0], this.column + coords[1]])
        .filter((coords) => this.isInGrid(coords[0], coords[1]));
        return directions;
    }

    getHorizontalCells() {
        const directions = [[0, 1], [0, -1]]
        .map((coords) => [this.row + coords[0], this.column + coords[1]])
        .filter((coords) => this.isInGrid(coords[0], coords[1]));
        return directions;
    }

    isInGrid(row, column) {
        if (row >= 0 && row <= 9 && column >= 0 && column <= 9) {
            return true;
        }  else {
            return false;
        }
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


    hasAdjacentShipCells(row, column, shipName) {
        const cell = this.grid[row][column];
        const adjacentCells = cell.getAdjacentCells();
        for (let adjCell of adjacentCells ) {
            const adjacentCell = this.grid[adjCell[0]][adjCell[1]];
            if (adjacentCell.isShipCell && adjacentCell.ship.name != shipName) {
                    return true;
            }
        }
        return false;
    }



    isInGrid(row, column) {
        if (row >= 0 && row <= 9 && column >= 0 && column <= 9 && !this.grid[row][column].isHit) {
            return true;
        }  else {
            return false;
        }
    }

    isValid(row, column, shipName) {
        if (this.isInGrid(row, column) && !this.grid[row][column].isShipCell && !this.hasAdjacentShipCells(row, column, shipName)) {
            return true;
        }  else {
            return false;
        }
    }

    CheckShipPlacement (row, column, ship, direction) {
        if (direction === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                if (!this.isValid(row, column + i, ship.name)) {
                    return false;
                }
            }
        }
        if (direction === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                if (!this.isValid(row - i, column, ship.name)) {
                    return false;
                }
            }
        }
        return true;  
    }


    placeShip(ship, row, column, direction) {
        if (this.CheckShipPlacement(row, column, ship, direction)) {
            if (direction === "horizontal") {
                for (let i = 0; i < ship.length; i++) {
                    this.grid[row][column].isShipCell = true;
                    this.grid[row][column].ship = ship;
                    column++;
                }
            }
            if (direction === "vertical") {
                for (let i = 0; i < ship.length; i++) {
                    this.grid[row][column].isShipCell = true;
                    this.grid[row][column].ship = ship;
                    row--;
                }
            }
            return this.ships.push(ship);
        } else {
            return false;
        }
    }

    receiveAttack(row, column) {
        if (!this.isInGrid(row, column)) {
            return false;
        }
        const cell = this.grid[row][column];
        if (!cell.isHit) {
            cell.isHit = true;
            if (cell.isShipCell) {
                cell.ship.hit();
                if(cell.ship.isSunk()) {
                    return 'Ship has Sunk!'
                }
                return 'Hit!';
            }
        }
        return 'Miss!';
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
