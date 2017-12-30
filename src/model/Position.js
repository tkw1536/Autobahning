class Position {
    /**
     * Coordinates in the Level and Map
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     */
    constructor(x,y,z = 0) {
        this.x = x
        this.y = y
        this.z = Math.floor(z);
    }

    toString() {
        return `[${this.x},${this.y},${this.z}]`
    }

    /** Checks if this position equals another position */
    equals(other) {
        return (other instanceof Position) && other.x === this.x && other.y === this.y && other.z === this.z
    }
}

export {Position};