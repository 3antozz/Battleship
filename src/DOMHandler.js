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
        button.ariaLabel = "cell button"
        if (cell.ship && cell.ship.isSunk()) {
            button.classList.add("sunk-ship");
        }
        if (cell.isShipCell && cell.player === "player") {
            button.classList.add("unhit-ship");
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

    animateCell(player, row, column) {
        const cell = document.querySelector(`[data-player="${player}"][data-row="${row}"][data-column="${column}"]`);
        cell.classList.add("animate-miss")
    }

    clearGrid(gridDom) {
        gridDom.textContent = "";
    }


    renderShotStatus(message) {
        const p = document.querySelector(".turn");
        if (message === "Ship has Sunk!") {
            const div = document.querySelector(".turn-div");
            p.textContent = message;
            div.style.backgroundColor = "#ee9090";
        }
    }

    renderTurnStatus(player, init = false) {
        setTimeout(() => {
            // const div = document.querySelector(".turn-div");
            const p = document.querySelector(".right-player .info h2");
            if (player === "player") {
                p.textContent = "Your Turn";
                // div.style.backgroundColor = "#90ee90";
            } else {
                p.textContent = "Computer Board";
                // div.style.backgroundColor = "#ee9090";
            }
        }, init ? 0 : 350)
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
        DOMCell.style.cursor = "pointer";
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
            const grid = document.querySelector(".right-player");
            grid.classList.remove('shake');
            grid.offsetHeight;
            grid.classList.add('shake');
        } else {
            const element = document.querySelector(".left-player .ships-right");
            element.textContent = `Ships left: ${shipsCount}`;
            const grid = document.querySelector(".left-player");
            grid.classList.remove('shake');
            grid.offsetHeight;
            grid.classList.add('shake');
        }
    }

    renderBoardInfo() {
        const leftPlayer = document.querySelector(".left-player");
        const infoDiv = document.createElement("div");
        const shipsDiv = document.createElement("div");
        infoDiv.classList.add("info");
        shipsDiv.classList.add("ships-count");
        const header1 = document.createElement("h2");
        const header2 = document.createElement("h2");
        header2.classList.add("ships-right");
        header1.textContent = "Your Board";
        header2.textContent = "Ships Left: 5";
        infoDiv.appendChild(header1);
        shipsDiv.appendChild(header2);
        leftPlayer.append(infoDiv, shipsDiv);
    }

    hideButtons(...domElements) {
        domElements.forEach((element) => {
            element.classList.add("hidden");
        });
        this.renderBoardInfo();
    }
    enableOverlay(player, init = false) {
        setTimeout(() => {
        if (player === "computer") {
            const gridRight = document.querySelector(".grid-right");
            const grid = document.querySelector(".grid-left");
            grid.classList.add("active-board");
            gridRight.classList.add("active-board-player");
            this.disableOverlay("player");
        } else {
            const grid = document.querySelector(".grid-right");
            grid.classList.add("active-board");
            this.disableOverlay("computer");
        }
        }, init ? 0 : 350)
    }

    disableOverlay(player) {
        if (player === "computer") {
            const gridRight = document.querySelector(".grid-right");
            const rightDivs = document.querySelectorAll(".right-player > div:not(:nth-child(2))");
            const leftDivs = document.querySelectorAll(".left-player > div:not(:nth-child(2))");
            const grid = document.querySelector(".grid-left");
            rightDivs.forEach(div => div.classList.add("inactive-board"));
            leftDivs.forEach(div => div.classList.remove("inactive-board"));
            grid.classList.remove("active-board", "active-board-player");
            gridRight.classList.remove("active-board-player");
        } else {
            const leftDivs = document.querySelectorAll(".left-player > div:not(:nth-child(2))");
            leftDivs.forEach(div => div.classList.add("inactive-board"));
            const rightDivs = document.querySelectorAll(".right-player > div:not(:nth-child(2))");
            rightDivs.forEach(div => div.classList.remove("inactive-board"));
            const grid = document.querySelector(".grid-right");
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

    clearBoardInfo() {
        const infoDiv = document.querySelector(".left-player > .info");
        const shipsDiv = document.querySelector(".left-player > .ships-count");
        infoDiv.remove();
        shipsDiv.remove();
        const grid = document.querySelector(".grid-left");
        grid.classList.remove("active-board");
    }

    renderWinner(message) {
        // const p = document.querySelector(".turn");
        // p.textContent = message;
        setTimeout(() => {
            if (message === "Computer Won!") {
                const h2 = document.querySelector(".left-player .info h2");
                h2.textContent = message;
                this.enableOverlay("player", true);
                // const div = document.querySelector(".turn-div");
                // div.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            } else {
                const h2 = document.querySelector(".right-player .info h2");
                h2.textContent = message;
                this.enableOverlay("computer", true);
            }
        }, 350)
    }

    showDialog(winner) {
        setTimeout(() => {
            const dialog = document.querySelector("dialog");
            const p = document.querySelector(".box h1");
            if (winner === "Computer") {
                p.textContent = "You Lost :(";
                p.style.color = "red";
            } else {
                p.textContent = "You Won 😄";
                p.style.color = "rgba(0, 188, 0, 1)";
            }
            dialog.showModal();
        }, 1000)
    }

    currentShip(className) {
        const cells = document.querySelectorAll(
            `.ships .${className} .proto-cell`,
        );
        cells.forEach((cell) => {
            cell.classList.add("placed-ship");
        });
    }

    shipIndicator(className) {
        const previousIndicator = document.querySelector(`.ships .ship${className+1} span`);
        if(previousIndicator) {
            previousIndicator.style.display = 'none';
        }
        if(className === 3) {
            const currentIndicator = document.querySelector(`.ships .ship${2} span`);
            if(currentIndicator) {
                currentIndicator.style.display = 'block';
            }
            return;
        }
        const currentIndicator = document.querySelector(`.ships .ship${className} span`);
        if(currentIndicator) {
            currentIndicator.style.display = 'block';
        }
    }

    removeIndicator() {
        const indicators = document.querySelectorAll(".ships div[class^='ship'] span");
        indicators.forEach((indi) => indi.style.display = "none")
    }

    clearDOMShips() {
        const cells = document.querySelectorAll(`.proto-cell`);
        cells.forEach((cell) => {
            cell.classList.remove("placed-ship");
        });
    }

    fillDOMShips() {
        const cells = document.querySelectorAll(`.proto-cell`);
        cells.forEach((cell) => {
            cell.classList.add("placed-ship");
        });
    }

    hideProtoShips() {
        const ships = document.querySelector(".ships");
        ships.style.display = "none";
        this.clearDOMShips();
    }

    showProtosShips() {
        const ships = document.querySelector(".ships");
        ships.style.display = "flex";
    }

    hideRightSide() {
        const rightPlayer = document.querySelector(".right-player");
        rightPlayer.classList.remove("right-player-visible");
        const leftDivs = document.querySelectorAll(".left-player > div");
        leftDivs.forEach(div => div.classList.remove("inactive-board"));
    }

    hideParas() {
        const paras = document.querySelector(".paras");
        paras.style.display = "none";
        const restartBtn = document.querySelector(".restart");
        restartBtn.remove();
    }

    createRestartBtn() {
        const paras = document.querySelector(".paras");
        const button = document.createElement("button");
        button.classList.add("restart");
        button.textContent = "Restart";
        paras.appendChild(button);
    }
}
module.exports = DOMHandler;
