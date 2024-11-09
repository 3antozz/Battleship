class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.shipCell = false;
        this.hitMark = false;
    }
}

class GameBoard {
    constructor () {
        this.grid = this.createGrid();
    }

    createGrid () {
        let grid = [];
        for (let row = 0; row <= 9; row++) {
            let fullRow = [];
            for (let column = 0; column <= 9; column++) {
                const square = new Cell(row, column);
                fullRow.push(square);
            }
            grid.push(fullRow);
        }
        return grid;
    }

    isValid(row, column) {
        if (row >= 0 && row <= 9 && column >= 0 && column <= 9) {
            return true;
        } else {
            return false;
        }
    }

    placeShip(ship, row, column, direction) {
        if(!this.isValid(row, column)) {
            return 'INSIDE THE GRID PLZ';
        }
        if (direction === 'horizontal') {
            if (!this.isValid(row, column + ship.length)) {
                return 'INSIDE THE GRID PLZ';
            }
            for (let i=0; i < ship.length; i++) {
                this.grid[row][column].shipCell = true;
                this.grid[row][column].shipName = ship.name;
                column++;
            }
        }
        if (direction === 'vertical') {
            if (!this.isValid(row - ship.length, column)) {
                return 'INSIDE THE GRID PLZ';
            }
            for (let i=0; i < ship.length; i++) {
                this.grid[row][column].shipCell = true;
                this.grid[row][column].shipName = ship.name;
                row--;
            }
        }



    }
}

module.exports = GameBoard;