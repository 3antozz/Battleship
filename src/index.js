import "./styles.css";
const DOMHandler = require('./DOMHandler')
const GameController = require('./GameController');
const Ship = require('./ShipClass');
console.log("TEST");

(function init () {
    const gameControl = new GameController();
    const DOM = new DOMHandler();
    DOM.renderGrid(gameControl.playerOne.board.grid);
    randomShipPlacementButton(gameControl, DOM) 
    clearButton(gameControl, DOM);
    manualShipPlacement(gameControl, DOM);
    rotateButton(gameControl);
    // gameControl.startGame();
    // DOM.renderGrid(gameControl.playerTwo.board.grid);
    // attackEventListener(gameControl, DOM);
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

function manualShipPlacement(gameControl, DOM) {
    const ships = [new Ship('Carrier', 5), new Ship('Battleship', 4), new Ship('Destroyer', 3), new Ship('Submarine', 3), new Ship('Patrol', 2) ];
    let currentShipIndex = 0;
    const leftGrid = document.querySelector('.grid-left');
    let placementAllowed = false;
    leftGrid.addEventListener("mouseover", handleMouseOver);
    leftGrid.addEventListener("click", handleClick);
    function handleMouseOver (event) {
        console.log("triggered!");
        if(gameControl.playerOne.board.ships.length === 5) {
            return;
        }
        if(gameControl.playerOne.board.ships.length === 0) {
            currentShipIndex = 0;
        }
        const ship = ships[currentShipIndex];
        const direction = gameControl.DOMdirection;
        const cell = [event.target.dataset.row, event.target.dataset.column];
        if (gameControl.playerOne.board.CheckShipPlacement(ship, +cell[0], +cell[1], direction)) {
            placementAllowed = true;
            DOM.highlightShip(event.target, ship.length, direction);
        } else {
            placementAllowed = false;
            DOM.badShipPlacement();
        }
    }

    function handleClick (event) {
        if(gameControl.playerOne.board.ships.length === 5) {
            return;
        }
        if(gameControl.playerOne.board.ships.length === 0) {
            currentShipIndex = 0;
        }
        const ship = ships[currentShipIndex];
        const direction = gameControl.DOMdirection;
        const cell = [event.target.dataset.row, event.target.dataset.column];
        if (placementAllowed) {
            gameControl.playerOne.board.placeShip(ship, +cell[0], +cell[1], direction);
            DOM.renderGrid(gameControl.playerOne.board.grid);
            currentShipIndex++;
        } else {
            DOM.badShipPlacement();
        }
    }
}
