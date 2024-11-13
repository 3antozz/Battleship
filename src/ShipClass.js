class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
    }

    hit() {
        return this.hits++;
    }

    isSunk() {
        return this.hits >= this.length ? true : false;
    }
}

module.exports = Ship;
