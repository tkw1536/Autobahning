class Position {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }

    equals(other) {
        return other.x === this.x && other.y === this.y && other.z === this.z
    }
}

export default Position