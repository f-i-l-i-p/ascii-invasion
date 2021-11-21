import ICollisionListener from "../core/listeners/collisionListener";
import IPTickListener from "../core/listeners/pTickListener";
import Entity from "./entity";

export default class UFO extends Entity implements IPTickListener, ICollisionListener {
    texture = [
        [' ', ' ', ' ', ' ', '_', '_', ':', '_', '_', ' ', ' ', ' ', ' '],
        [' ', '_', '_', '/', 'o', '_', 'o', '_', 'o', '\\', '_', '_', ' '],
        ['(', '_', '~', '_', '~', '_', '~', '_', '~', '_', '~', '_', ')'],
    ]

    public static readonly START_HEALTH = 3;
    private health = UFO.START_HEALTH;

    public init() {
        this.gridWorld.addPTickListener(this);
        this.gridWorld.addFalling(this);
        this.gridWorld.addCollisionListener(this);
        super.init();
    }

    public pTick(): void {
        if (this.health === 0) {
            this.destroy();
        }

        if (this.position.y >= this.gridWorld.getSize().y) {
            this.destroy();
        }
    }

    public onCollision(entity: Entity) {
        console.log("Collision", this, entity)
    }

    public damage(amount: number): void {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        this.gridWorld.removeFalling(this);
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }
}