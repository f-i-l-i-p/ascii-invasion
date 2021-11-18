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
        this.gridWorld.addPTickListener(this);
        super.init();
    }

    public pTick(): void {
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        super.destroy();
    }
}