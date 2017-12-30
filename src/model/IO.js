import {Position} from "./Position";

class IO {
    /**
     * Common class for Sources and Sinks
     * @param {Number} id A unique id for this IO Object
     * @param {Position} position the position of this IO Object
     */
    constructor(id, position){
        this.id = id;
        this.position = position;
    }

    /** Adds this IO to a level */
    addTo(level){ return this; }
}

class Source extends IO {
    /**
     * A source sends cars to the node specified by `to` parameter
     * @param {Number} id Unique number of this source (level scope) 
     * @param {Position} position Position on the level
     * @param {Object.<Number, Number>} targets Dict from sink IDs to relative frequency numbers
     */
    constructor(id, position, targets = {}) {
        super(id, position);
        this.targets = targets
    }

    toString() {
        return `Source(id=${this.id}, position=${this.position}, targets=${JSON.stringify(this.targets)})`
    }

    /**
     * Adds a new sink as a target to this Source
     * @param {Sink} sink 
     * @param {Number} frequency 
     */
    addTarget(sink, frequency){
        this.targets[sink.id] = frequency;
        return this;
    }

    /** Connects a sink to this node
     * @param {Sink} sink
     */
    connectFrom(sink){
        sink.connectTo(this); 
        return this;
    }

    /**
     * Adds this Source to a level
     * @param {Level} level 
     */
    addTo(level){
        level.addSource(this);
        return this;
    }
}

class Sink extends IO {
    /**
     * A sink swallows cars
     * @param {Number} id Unique number of this sink (level scope) 
     * @param {Position} position Position on the level
     * @param {?Number} to ID of a connected source (that this sink sends cars to)
     */
    constructor(id, position, to) {
        super(id, position);
        this.to = to;
    }

    toString() {
        return `Source(id=${this.id}, position=${this.position}, to=${JSON.stringify(this.targets)})`
    }

    /**
     * Connects this Sink to the given Source object
     * @param {Source} src 
     */
    connectTo(src) {
        this.to = src.id;
        return this;
    }

    /**
     * Adds this Sink to a level
     * @param {Level} level 
     */
    addTo(level){
        level.addSink(this);
        return this;
    }
}

export {IO, Source, Sink};