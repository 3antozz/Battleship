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

    // renderShotStatus(message) {
    //     const p = document.querySelector(".hit");
    //     p.textContent = message;
    //     p.style.color = "black";
    //     if (message === "Hit!" || message === "Ship has Sunk!") {
    //         p.style.color = "red";
    //     }
    // }

    renderShotStatus(message) {
        const p = document.querySelector(".turn");
        if (message === "Ship has Sunk!") {
            const div = document.querySelector(".turn-div");
            p.textContent = message;
            div.style.backgroundColor = "red";
        }
    }

    renderTurnStatus(player) {
        const div = document.querySelector(".turn-div");
        const p = document.querySelector(".turn");
        if (player === "player") {
            p.textContent = "Your Turn";
            div.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        } else {
            p.textContent = "Wait";
            div.style.backgroundColor = "rgb(255 85 85 / 50%)";
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

    updateShipCount(shipsCount, player) {
        if (player === "computer") {
            const element = document.querySelector(".right-player .ships-left");
            element.textContent = `Ships left: ${shipsCount}`;
        } else {
            const element = document.querySelector(".left-player .ships-left");
            element.textContent = `Ships left: ${shipsCount}`;
        }

    }

    renderBoardInfo() {
        const leftPlayer = document.querySelector(".left-player");
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
        const header1 = document.createElement("h2");
        const header2 = document.createElement("h2");
        header2.classList.add("ships-left");
        header1.textContent = "Your Board";
        header2.textContent = "Ships Left: 5";
        infoDiv.append(header1, header2);
        leftPlayer.appendChild(infoDiv);
    }

    hideButtons(...domElements) {
        domElements.forEach((element) => {
            element.classList.add("hidden");
        });
        this.renderBoardInfo();
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
        const para = document.querySelector(".paras");
        para.style.display = "flex";
    }
    showButtons(...domElements) {
        domElements.forEach((element) => {
            element.classList.remove("hidden");
        });
    }

    hideMessages() {
        const hit = document.querySelector(".hit");
        const turn = document.querySelector(".turn");
        hit.textContent = "";
        turn.textContent = "";
    }

    clearBoardInfo() {
        const infoDiv = document.querySelector(".left-player > .info");
        infoDiv.remove();
        const grid = document.querySelector(".grid-left");
        grid.classList.remove("active-board");
    }

    renderWinner(message) {
        this.hideMessages();
        const p = document.querySelector(".turn");
        p.textContent = message;

    }

    hideRightSide () {
        const rightPlayer = document.querySelector(".right-player")
        rightPlayer.classList.remove("right-player-visible");
    }

    hideParas () {
        const paras = document.querySelector(".paras");
        paras.style.display = "none";
        const restartBtn = document.querySelector(".restart");
        restartBtn.remove();
    }

    createRestartBtn () {
        const paras = document.querySelector(".paras");
        const button = document.createElement("button");
        button.classList.add("restart");
        button.textContent = "Restart";
        paras.appendChild(button);
    }
}
module.exports = DOMHandler;
