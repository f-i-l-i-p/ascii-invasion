import IPTickListener from "../core/listeners/pTickListener";
import Entity from "./entity";

export default class UFO extends Entity implements IPTickListener {
    texture = [
        [' ', ' ', ' ', ' ', '_', '_', ':', '_', '_', ' ', ' ', ' ', ' '],
        [' ', '_', '_', '/', 'o', '_', 'o', '_', 'o', '\\', '_', '_', ' '],
        ['(', '_', '~', '_', '~', '_', '~', '_', '~', '_', '~', '_', ')'],
    ]

    public init() {
        this.gridWorld.addPTickListener(this);
        super.init();
    }

    public pTick(): void {
        this.position.y++;

        console.log(this.position);
        
        if (this.position.y >= this.gridWorld.getSize().y) {
            this.destroy();
        }
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        super.destroy();
    }
}