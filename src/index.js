import "./styles.css";
const DOMHandler = require("./DOMHandler");
const GameController = require("./GameController");

(function init() {
    const DOM = new DOMHandler();
    let gameControl = new GameController(DOM);
    const randomButton = document.querySelector(".random");
    const rotateButton = document.querySelector(".rotate");
    const clearButton = document.querySelector(".clear");
    const startButton = document.querySelector(".start");
    const leftGrid = document.querySelector(".grid-left");
    const rightGrid = document.querySelector(".grid-right");
    const closeDialog = document.querySelector(".close");
    const dialog = document.querySelector("dialog");

    DOM.renderGrid(gameControl.playerOne.board.grid);
    DOM.shipIndicator("5")



    randomButton.addEventListener("click", () => {
        gameControl.createNewPlayer();
        gameControl.randomizeShipsPlacement(gameControl.playerOne.board);
        DOM.renderGrid(gameControl.playerOne.board.grid);
        DOM.fillDOMShips();
        DOM.removeIndicator();
    });

    rotateButton.addEventListener("click", () => {
        gameControl.changeDOMDirection();
    });

    clearButton.addEventListener("click", () => {
        gameControl.createNewPlayer();
        DOM.renderGrid(gameControl.playerOne.board.grid);
        DOM.clearDOMShips();
        DOM.removeIndicator();
        DOM.shipIndicator("5");
        gameControl.currentShipPlacement = 5;
    });

    leftGrid.addEventListener("mouseover", (event) => {
        gameControl.handleMouseOver(event);
    });

    leftGrid.addEventListener("click", (event) => {
        gameControl.handleClick(event);
    });

    rightGrid.addEventListener("click", (event) => {
        gameControl.handleAttack(event);
    });

    closeDialog.addEventListener("click", () => {
        dialog.close();
    })

    startButton.addEventListener("click", () => {
        if (gameControl.playerOne.board.ships.length === 5) {
            DOM.hideButtons(
                randomButton,
                rotateButton,
                clearButton,
                startButton,
            );
            DOM.hideProtoShips();
            gameControl.currentShipPlacement = 5;
            DOM.showMessages();
            DOM.createRestartBtn();
            gameControl.startGame();
            DOM.renderGrid(gameControl.playerTwo.board.grid);
            DOM.updateShipCount(5, "computer");
            DOM.renderTurnStatus("player", true);
            DOM.enableOverlay("computer", true);
            const restartBtn = document.querySelector(".restart");
            restartBtn.addEventListener("click", () => {
                gameControl = new GameController(DOM);
                DOM.showProtosShips();
                DOM.hideRightSide();
                DOM.hideParas();
                DOM.shipIndicator("5");
                DOM.showButtons(
                    randomButton,
                    rotateButton,
                    clearButton,
                    startButton,
                );
                DOM.renderGrid(gameControl.playerOne.board.grid);
                DOM.clearBoardInfo();
                setTimeout(() => {
                    DOM.renderGrid(gameControl.playerOne.board.grid);
                    const grid = document.querySelector(".grid-left");
                    grid.classList.remove("active-board");
                }, 400);
            });
        } else {
            alert("Please place all your ships!");
        }
    });
})();
