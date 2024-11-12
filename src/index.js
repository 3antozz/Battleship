import "./styles.css";
import {renderGrid, clearGrid, renderShotStatus} from "./DOMHandler";
const GameController = require('./GameController');
console.log("TEST");

(function init () {
    const gameControl = new GameController();
    gameControl.startGame();
    renderGrid(gameControl.playerOne.board.grid);
    renderGrid(gameControl.playerTwo.board.grid);
    attackEventListener(gameControl);
})()

function attackEventListener (gameControl) {
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
            renderShotStatus(playerTurn);
            clearGrid(rightBoard);
            renderGrid(gameControl.playerTwo.board.grid);
            setTimeout(() => {
                const computerTurn = gameControl.computerTurn();
                renderShotStatus(computerTurn);
                clearGrid(leftBoard);
                renderGrid(gameControl.playerOne.board.grid);
            }, 600);
            gameControl.switchTurn();
        } else {
            return;
        }
    })
}
