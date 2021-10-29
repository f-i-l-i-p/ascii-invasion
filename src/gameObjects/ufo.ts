import IPTickListener from "../core/listeners/pTickListener";
import Entity from "./entity";

export default class UFO extends Entity implements IPTickListener {
    texture = [
        [' ', ' ', ' ', ' ', '_', '_', ':', '_', '_', ' ', ' ', ' ', ' '],
        [' ', '_', '_', '/', 'o', '_', 'o', '_', 'o', '\\', '_', '_', ' '],
        ['(', '_', '~', '_', '~', '_', '~', '_', '~', '_', '~', '_', ')'],
    ]

    public init() {
        this.startPTickListening(this);
    }

    public pTick(): void {
        this.position.y++;

        if (this.position.y > 25) {
            this.position.y = 0;
        }
    }
}