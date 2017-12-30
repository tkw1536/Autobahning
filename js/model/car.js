import "./pos"
import "./src-snk"
import "./node"

class Car {
    /**
     * 
     * @param {Node} startNode The node this car starts at
     * @param {Node} targetNode The node this car wants to reach
     */
    constructor(startNode, targetNode) {
        this.current = startNode
        this.target = targetNode
        this.next = null
        this.pos = 0
    }

    /**
     * Updates the car's position.
     * @param {Function} deciderFn Called to decide which path to take at a split in the road
     * @param {Number} amount How far to move. 1 === length of one node
     * @returns If this car should be deleted or not
     */
    tick(deciderFn, amount) {
        var steps = Math.floor(this.pos + amount)

        for(var i = 0; i < steps; i++) {
            current = next
            if(current.type == SINK_NODE) {
                return true
            }
            next = deciderFn.call(this,current.following)
        }

        this.pos = (this.pos + amount) % 1
    }

    /**
     * @returns The interpolated grid position of the car
     */
    getPos() {
        return this.current.pos.linInterpolate(this.next.pos, this.pos)
    }
}

export default Car