import {IO, Source, Sink} from "./IO";
import {Position} from "./Position";

class Level {
    /**
     * Represents a list of sources, sinks and obstacles
     * @param {String} name The name of this level
     * @param {Number} width Width of this level
     * @param {Number} height Height of this level
     * @param {?Number} depth Depth of this level
     */
    constructor(name, width, height, depth = 3){
        this.name = name;

        this.width = width;
        this.height = height;
        this.depth = depth;

        // a counter for sources and sinks
        this._ioCounter = 0;
        
        /** @type {Source[]} */
        this.sources = [];

        /** @type {Sink[]} */
        this.sinks = [];
    }

    toString() {
        return `Level(name=${this.name}, dimensions=${this.width}x${this.width}x${this.height}, sources=${this.sources.join(',')}, sinks=${this.sinks.join(',')})`
    }

    /** generates a new ID for use with sources and sinks */
    _newIOId() {return this._ioCounter++; }

    //#region IO getters and validation
    //=================================

    /**
     * Checks if a specific position is valid within this level
     * @param {Position} position 
     */
    isValidPosition(position) {
        return (0 <= position.x) && (position.x < this.width) && (0 <= position.y) && (position.y < this.height) && (0 <= position.z) && (position.z < this.depth);
    }

    /**
     * gets an IO object with the given ID or undefined
     * @param {Number} id
     * @returns {?IO}
     */
    getIO(id) {
        return this.getSink(id) || this.getSource(id);
    }

    /** gets the sink with a given id */
    getSink(id) { return this.sinks.find(s => s.id == id); }

    /** gets the source with a given id */
    getSource(id) { return this.sources.find(s => s.id == id); }

    /**
     * Gets an IO at the given position or undefined
     * @param {Position} pos 
     */
    getIOAt(pos) {
        return this.getSourceAt(pos) || this.getSinkAt(pos); 
    }

    /** gets the sink at a given position */
    getSinkAt(pos) { return this.sinks.find(s => s.position.equals(pos)); }

    /** gets the source at a given position */
    getSourceAt(pos) { return this.sources.find(s => s.position.equals(pos)); }

    /** 
     * Checks if a given IO object is valid or not 
     * @param {IO} io
    */
    isValidIO(io) {
        return (this.isValidPosition(io.position)) && (!this.getIO(io.id)) && (!this.getIOAt(io.position));
    }

    //#endregion

    //#region SOURCES
    //=================================

    /**
     * Checks if a source is valid
     * @param {Source} source 
     */
    isValidSource(source) {
        // check that all the referenced IOs are defined as sinks
        var c = true;
        Object.keys(source.targets).map(v => !!this.getSink(io)).forEach(v => c = v && c);
        if(!c){ return false; }
        
        
        // and check that we have valid other properties
        return this.isValidIO(source);
    }

    /**
     * Generates a new Source for use within this level
     * @param {Position} position 
     * @return {Source}
     */
    newSource(position){
        if(!this.isValidPosition(position)){throw new Error('invalid position '+position)};
        return new Source(this._newIOId(), position, {}); 
    }

    /** add a source to this level */
    addSource(src) {
        if(!this.isValidSource(src)){ throw new Error('invalid source '+src); }
        this.sources.push(src); 
        return this;
    }

    // #endregion

    //#region SINKS
    //=================================

    /**
     * Checks if a sink is valid
     * @param {Sink} sink 
     */
    isValidSink(sink) {
        // check that if to is defined, it is a known sink
        if(sink.to && !this.getSource(sink.to)) { return false; }
        
        // and check that we have valid other properties
        return this.isValidIO(sink);
    }

    /**
     * Generates a new Source for use within this level
     * @param {Position} position 
     * @return {Sink}
     */
    newSink(position){
        if(!this.isValidPosition(position)){throw new Error('invalid position '+position)};
        return new Sink(this._newIOId(), position, undefined); 
    }

    /** add a source to this level */
    addSink(sink) {
        if(!this.isValidSink(sink)){ throw new Error('invalid sink '+sink); }
        this.sinks.push(sink); 
        return this;
    }

    // #endregion
}

export {Level};