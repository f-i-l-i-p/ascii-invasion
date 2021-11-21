import ICollisionListener from "../core/listeners/collisionListener";
import IPTickListener from "../core/listeners/pTickListener";
import Entity from "./entity";
import Living from "./living";

export default class UFO extends Living implements IPTickListener, ICollisionListener {
    texture = [
        [' ', ' ', ' ', ' ', '_', '_', ':', '_', '_', ' ', ' ', ' ', ' '],
        [' ', '_', '_', '/', 'o', '_', 'o', '_', 'o', '\\', '_', '_', ' '],
        ['(', '_', '~', '_', '~', '_', '~', '_', '~', '_', '~', '_', ')'],
    ]

    private static readonly HEALTH = 3;

    public init() {
        this.health = UFO.HEALTH;

        this.gridWorld.addFalling(this);
        this.gridWorld.addCollisionListener(this);
        super.init();
    }

    public pTick(): void {
        if (this.position.y >= this.gridWorld.getSize().y) {
            this.destroy();
        }

        super.pTick();
    }

    public onCollision(entity: Entity) {
    }

    public destroy() {
        this.gridWorld.removeFalling(this);
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }

    protected onDeath() {
        this.destroy();
    }
}