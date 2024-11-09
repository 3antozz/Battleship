const GameBoard = require('./GameBoardClass');

class Player {
    constructor(type) {
        this.type = type;
        this.board = new GameBoard();
    }
}






module.exports = Player;