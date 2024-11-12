const GameBoard = require("./GameBoardClass");

class Player {
    constructor(type) {
        this.type = type;
        this.board = new GameBoard(this.type);
    }
}




module.exports = Player;
