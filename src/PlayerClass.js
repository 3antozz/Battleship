const GameBoard = require("./GameBoardClass");

class Player {
    constructor(type) {
        this.type = type;
        this.board = new GameBoard(this.type);
    }

    computerShot () {
        const row = Math.floor(Math.random() * 10);
        const column = Math.floor(Math.random() * 10);
        return [row, column];
    }
}




module.exports = Player;
