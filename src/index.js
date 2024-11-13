import "./styles.css";
const DOMHandler = require('./DOMHandler')
const GameController = require('./GameController');
console.log("TEST");

(function init () {
    const DOM = new DOMHandler();
    const gameControl = new GameController(DOM);
    DOM.renderGrid(gameControl.playerOne.board.grid);
    randomShipPlacementButton(gameControl, DOM) 
    clearButton(gameControl, DOM);
    rotateButton(gameControl);
    // const leftGrid = document.querySelector('.grid-left');
    // leftGrid.addEventListener("mouseover", (event) => {
    //     gameControl.handleMouseOver(event));
    // }
    // leftGrid.addEventListener("click", (event) => {
    //     gameControl.handleClick(event);
    // })
    const rightGrid = document.querySelector(".grid-right");
    rightGrid.addEventListener("click", (event) => {
        gameControl.handleAttack(event);
    })
    gameControl.startGame();
    DOM.renderGrid(gameControl.playerTwo.board.grid);
})()

// function attackEventListener (gameControl, DOM) {
//     const rightBoard = document.querySelector('.right-player');
//     const leftBoard = document.querySelector('.left-player');
//     rightBoard.addEventListener('click', (event) => {
//         if (!gameControl.gameOver() && gameControl.currentPlayer.type === "player") {
//             const cell = [event.target.dataset.row, event.target.dataset.column];
//             const playerTurn = gameControl.playerTwo.board.receiveAttack(cell[0], cell[1]);
//             if (playerTurn === false) {
//                 return;
//             }
//             gameControl.switchTurn();
//             DOM.renderShotStatus(playerTurn);
//             DOM.renderGrid(gameControl.playerTwo.board.grid);
//             if (!gameControl.gameOver()) {
//                 setTimeout(() => {
//                     const computerTurn = gameControl.computerTurn();
//                     DOM.renderShotStatus(computerTurn);
//                     DOM.clearGrid(leftBoard);
//                     DOM.renderGrid(gameControl.playerOne.board.grid);
//                 }, 600);
//                 gameControl.switchTurn();
//             } else {
//                 return;
//             }
//         } else {
//             return;
//         }
//     })
// }

function randomShipPlacementButton (gameControl, DOM) {
    const randomButton = document.querySelector(".random");
    randomButton.addEventListener("click", () => {
        gameControl.createNewPlayer();
        gameControl.randomizeShipsPlacement(gameControl.playerOne.board);
        DOM.renderGrid(gameControl.playerOne.board.grid);
    })
}

function rotateButton (gameControl) {
    const rotateButton = document.querySelector(".rotate");
    rotateButton.addEventListener("click", () => {
        gameControl.changeDOMDirection();
    })
}

function clearButton (gameControl, DOM) {
    const clearButton = document.querySelector(".clear");
    clearButton.addEventListener("click", () => {
        gameControl.createNewPlayer();
        DOM.renderGrid(gameControl.playerOne.board.grid);
    })
}

