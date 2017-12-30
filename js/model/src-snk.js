import "./pos"

class Source {
    /**
     * A source sends cars to the node specified by `to` parameter
     * @param {*} id Unique number of this source (level scope) 
     * @param {Node} to Reference of the node that cars are emitted to
     * @param {*} position Position on the level
     * @param {Dict} targets Dict from sink IDs to relative frequency numbers
     */
    constructor(id, to, position, targets) {
        this.id = id
        this.to = to
        this.targets = targets
        this.position = position
    }
}

class Sink {
    /**
     * A sink swallows cars
     * @param {Number} id Unique number of this sink (level scope) 
     * @param {?Number} to ID of a connected source (that this sink sends cars to)
     * @param {Position} position 
     */
    constructor(id, to, position) {}
}

export default {
    Source,
    Sink
}