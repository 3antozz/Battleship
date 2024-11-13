import "./styles.css";
const DOMHandler = require("./DOMHandler");
const GameController = require("./GameController");

(function init() {
    const DOM = new DOMHandler();
    const gameControl = new GameController(DOM);
    const randomButton = document.querySelector(".random");
    const rotateButton = document.querySelector(".rotate");
    const clearButton = document.querySelector(".clear");
    const startButton = document.querySelector(".start");
    const leftGrid = document.querySelector(".grid-left");

    DOM.renderGrid(gameControl.playerOne.board.grid);

    randomButton.addEventListener("click", () => {
        gameControl.createNewPlayer();
        gameControl.randomizeShipsPlacement(gameControl.playerOne.board);
        DOM.renderGrid(gameControl.playerOne.board.grid);
    });

    rotateButton.addEventListener("click", () => {
        gameControl.changeDOMDirection();
    });

    clearButton.addEventListener("click", () => {
        gameControl.createNewPlayer();
        DOM.renderGrid(gameControl.playerOne.board.grid);
    });

    leftGrid.addEventListener("mouseover", (event) => {
        gameControl.handleMouseOver(event);
    });

    leftGrid.addEventListener("click", (event) => {
        gameControl.handleClick(event);
    });

    startButton.addEventListener("click", () => {
        if (gameControl.playerOne.board.ships.length === 5) {
            const rightGrid = document.querySelector(".grid-right");
            rightGrid.addEventListener("click", (event) => {
                gameControl.handleAttack(event);
            });
            gameControl.startGame();
            DOM.renderGrid(gameControl.playerTwo.board.grid);
        } else {
            alert("Please place all your ships!");
        }
    });
})();
