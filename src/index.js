import "./styles.css";
import {renderGrid} from "./DOMHandler";
const GameController = require('./GameController');
console.log("TEST");

(function init () {
    const gameControl = new GameController();
    gameControl.startGame();
    renderGrid(gameControl.playerOne.board.grid)
    renderGrid(gameControl.playerTwo.board.grid)
})();