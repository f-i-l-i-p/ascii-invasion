import IPTickListener from "../core/listeners/pTickListener";
import Entity from "./entity";

export default class Player extends Entity implements IPTickListener {
    texture = [
        [' ',' ',' ','/','^','\\',' ',' ',' '],
        [' ',' ','/','\'','o','\'','\\',' ',' '],
        [' ','/','\'',' ','_',' ','\'','\\',' '],
        [' ','[','.','|','_','|','.',']',' '],
        ['/','[','_','_','_','_','_',']','\\'],
        ['[','/',' ',' ',' ',' ',' ','\\',']'],
    ];

    public init() {
        this.startPTickListening(this);
    }

    public pTick(): void {
    }
}