class DOMHandler {
    constructor() {
        this.highlightedCells = [];
        this.redCells = [];
    }
    renderGrid(grid) {
        if (grid[0][0].player === "player") {
            const leftBoard = document.querySelector(".grid-left");
            this.clearGrid(leftBoard);
        } else {
            const rightBoard = document.querySelector(".grid-right");
            this.clearGrid(rightBoard);
        }
        grid.forEach((row) => {
            row.forEach((column) => {
                this.renderCell(column);
            });
        });
    }

    renderCell(cell) {
        const button = document.createElement("button");
        button.dataset.row = cell.row;
        button.dataset.column = cell.column;
        button.dataset.player = cell.player;
        button.classList.add("cell", "unhit-cell");
        if (cell.ship && cell.ship.isSunk()) {
            button.classList.add("sunk-ship");
        }
        if (cell.isShipCell && cell.player === "player") {
            button.classList.add("unhit-ship");
            button.dataset.ship = cell.ship.name;
        } else if (cell.isShipCell) {
            button.dataset.ship = cell.ship.name;
        }
        if (cell.isHit) {
            button.classList.add("miss");
            button.classList.remove("unhit-cell");
            if (cell.isShipCell) {
                button.classList.remove("miss");
                button.classList.remove("unhit-ship");
                button.classList.add("hit-ship");
            }
        }

        if (cell.player === "player") {
            const gridDiv = document.querySelector(".grid-left");
            gridDiv.appendChild(button);
        } else {
            const rightDiv = document.querySelector(".right-player");
            rightDiv.classList.add("right-player-visible");
            const gridDiv = document.querySelector(".grid-right");
            gridDiv.appendChild(button);
        }
    }

    clearGrid(gridDom) {
        gridDom.textContent = "";
    }

    renderShotStatus(message) {
        const p = document.querySelector(".hit");
        p.textContent = message;
        p.style.color = "black";
        if (message === "Hit!" || message === "Ship has Sunk!") {
            p.style.color = "red";
        }
    }

    renderTurnStatus(player) {
        const p = document.querySelector(".turn");
        if (player === "player") {
            p.textContent = "Your Turn";
        } else {
            p.textContent = "Computer's Turn";
        }
    }

    highlightShip(DOMCell, length, direction) {
        if (this.highlightedCells.length > 0) {
            this.unhighlightPreviousCells();
        }
        if (this.redCells.length > 0) {
            this.unhighlightRedCells();
        }
        this.highlightedCells.push(DOMCell);
        DOMCell.classList.add("highlight-cell");
        if (direction === "horizontal") {
            let row = DOMCell.dataset.row;
            let column = DOMCell.dataset.column;
            for (let i = 0; i < length; i++) {
                const cell = document.querySelector(
                    `[data-player="player"][data-row="${row}"][data-column="${column}"]`,
                );
                cell.classList.add("highlight-cell");
                column++;
                this.highlightedCells.push(cell);
            }
        }
        if (direction === "vertical") {
            let row = DOMCell.dataset.row;
            let column = DOMCell.dataset.column;
            for (let i = 0; i < length; i++) {
                const cell = document.querySelector(
                    `[data-player="player"][data-row="${row}"][data-column="${column}"]`,
                );
                cell.classList.add("highlight-cell");
                row--;
                this.highlightedCells.push(cell);
            }
        }
    }

    unhighlightPreviousCells() {
        this.highlightedCells.forEach((cell) => {
            cell.classList.remove("highlight-cell");
        });
    }

    unhighlightRedCells() {
        this.redCells.forEach((cell) => {
            cell.classList.remove("unallowed-cell");
        });
    }

    badShipPlacement(DOMCell, length, direction) {
        if (this.highlightedCells.length > 0) {
            this.unhighlightPreviousCells();
        }
        if (this.redCells.length > 0) {
            this.unhighlightRedCells();
        }
        this.redCells.push(DOMCell);
        DOMCell.style.cursor = "not-allowed";
        DOMCell.classList.add("unallowed-cell");
        if (direction === "horizontal") {
            let row = DOMCell.dataset.row;
            let column = DOMCell.dataset.column;
            for (let i = 1; i < length; i++) {
                column++;
                const cell = document.querySelector(
                    `[data-player="player"][data-row="${row}"][data-column="${column}"]`,
                );
                if (cell && !cell.classList.contains("unhit-ship")) {
                    cell.classList.add("unallowed-cell");
                } else return;
                this.redCells.push(cell);
            }
        }
        if (direction === "vertical") {
            let row = DOMCell.dataset.row;
            let column = DOMCell.dataset.column;
            for (let i = 1; i < length; i++) {
                row--;
                const cell = document.querySelector(
                    `[data-player="player"][data-row="${row}"][data-column="${column}"]`,
                );
                if (cell && !cell.classList.contains("unhit-ship")) {
                    cell.classList.add("unallowed-cell");
                } else return;
                this.redCells.push(cell);
            }
        }
    }

    hideButtons(...domElements) {
        const leftPlayer = document.querySelector(".left-player");
        domElements.forEach((element) => {
            element.classList.add("hidden");
        });
        const header2 = document.createElement("h2");
        header2.textContent = "Your Board";
        leftPlayer.appendChild(header2);
    }
    enableOverlay(player) {
        if (player === "computer") {
            const grid = document.querySelector(".grid-right");
            grid.classList.add("active-board");
            this.disableOverlay("player");
        } else {
            const grid = document.querySelector(".grid-left");
            grid.classList.add("active-board");
            this.disableOverlay("computer");
        }
    }

    disableOverlay(player) {
        if (player === "computer") {
            const grid = document.querySelector(".grid-right");
            grid.classList.remove("active-board");
        } else {
            const grid = document.querySelector(".grid-left");
            grid.classList.remove("active-board");
        }
    }

    showMessages() {
        const main = document.querySelector("main");
        const paras = document.createElement("div");
        paras.classList.add("paras");
        const hit = document.createElement("p");
        hit.classList.add("hit");
        const turn = document.createElement("p");
        turn.classList.add("turn");
        paras.append(hit, turn);
        main.appendChild(paras);
    }

    hideMessages() {
        const hit = document.querySelector(".hit");
        const turn = document.querySelector(".turn");
        hit.textContent = "";
        turn.textContent = "";
    }

    renderWinner (message) {
        this.hideMessages();
        const p = document.querySelector(".paras");
        const header = document.createElement("h1");
        header.textContent = message;
        p.appendChild(header);
    }
}
module.exports = DOMHandler;
