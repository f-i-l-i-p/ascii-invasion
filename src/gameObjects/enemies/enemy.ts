import ICollisionListener from "../../core/listeners/collisionListener";
import TickListener from "../../core/listeners/tickListener";
import Entity from "../entity";
import Living from "../living";

export default abstract class Enemy extends Living implements TickListener, ICollisionListener {
    private static readonly DROP_PROBABILITY = 0.2;

    public init() {
        this.gridWorld.addFalling(this);
        this.gridWorld.addCollisionListener(this);
        super.init();
    }

    public tick(): void {
        if (this.position.y >= this.gridWorld.getSize().y) {
            this.destroy();
        }

        super.tick();
    }

    public onCollision(entity: Entity) { }

    public destroy() {
        this.gridWorld.removeFalling(this);
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }

    protected onDeath() {
        this.destroy();
    }
}