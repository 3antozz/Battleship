class Ship {
    constructor (length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit () {
        return this.hits++
    }

    isSunk() {
        return this.hits >= length ? this.sunk = true : this.sunk = false;
    }
}






module.exports = Ship;