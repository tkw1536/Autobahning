class Position {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }

    equals(other) {
        return other.x === this.x && other.y === this.y && other.z === this.z
    }

    linInterpolate(other, alpha) {
        var inX = (1 - alpha) * this.x + alpha * other.x
        var inY = (1 - alpha) * this.y + alpha * other.y
        var inZ = (1 - alpha) * this.z + alpha * other.z

        return new Position(inX, inY, inZ)
    }
}

export default Position