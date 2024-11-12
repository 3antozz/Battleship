import "./styles.css";
const DOMHandler = require('./DOMHandler')
const GameController = require('./GameController');
console.log("TEST");

(function init () {
    const gameControl = new GameController();
    const DOM = DOMHandler();
    gameControl.startGame();
    DOM.renderGrid(gameControl.playerOne.board.grid);
    DOM.renderGrid(gameControl.playerTwo.board.grid);
    attackEventListener(gameControl, DOM);
})()

function attackEventListener (gameControl, DOM) {
    const rightBoard = document.querySelector('.right-player');
    const leftBoard = document.querySelector('.left-player');
    rightBoard.addEventListener('click', (event) => {
        if (!gameControl.gameOver() && gameControl.currentPlayer.type === "player") {
            const cell = [event.target.dataset.row, event.target.dataset.column];
            const playerTurn = gameControl.playerTwo.board.receiveAttack(cell[0], cell[1]);
            if (playerTurn === false) {
                return;
            }
            gameControl.switchTurn();
            DOM.renderShotStatus(playerTurn);
            DOM.clearGrid(rightBoard);
            DOM.renderGrid(gameControl.playerTwo.board.grid);
            if (!gameControl.gameOver()) {
                setTimeout(() => {
                    const computerTurn = gameControl.computerTurn();
                    DOM.renderShotStatus(computerTurn);
                    DOM.clearGrid(leftBoard);
                    DOM.renderGrid(gameControl.playerOne.board.grid);
                }, 600);
                gameControl.switchTurn();
            } else {
                return;
            }
        } else {
            return;
        }
    })
}
