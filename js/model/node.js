import "./pos"

const SOURCE_NODE = 0
const SINK_NODE = 1
const USER_NODE = 2

class Node {
    /**
     * 
     * @param {Array} following List of positions of nodes that follow this one
     * @param {*} pos Position on the level
     * @param {*} type Type of this node
     */
    constructor(following, pos, type) {
        this.following = following
        this.pos = pos
        this.type = type
    }
}