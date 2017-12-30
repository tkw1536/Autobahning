import {Level} from "./model/Level";
import {Position} from "./model/Position";

let theLevel = new Level("Example", 100, 100);
window.theLevel = theLevel;

let theSource = theLevel.newSource(new Position(0, 0, 0)).addTo(theLevel);
let theSink = theLevel.newSink(new Position(99, 0, 0)).addTo(theLevel);

let exit = theLevel.newSource(new Position(60, 0, 0)).addTo(theLevel).addTarget(theSink, 0.5);
let entry = theLevel.newSink(new Position(50, 0, 0)).addTo(theLevel).connectTo(exit);

theSource.addTarget(entry, 0.5).addTarget(theSink, 0.5);
console.log(theLevel.toString());