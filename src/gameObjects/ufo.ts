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
        this.gridWorld.addFalling(this);
        super.init();
    }

    public pTick(): void {
        if (this.position.y >= this.gridWorld.getSize().y) {
            this.destroy();
        }
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        this.gridWorld.removeFalling(this);
        super.destroy();
    }
}