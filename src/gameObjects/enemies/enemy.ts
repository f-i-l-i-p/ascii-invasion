import ICollisionListener from "../../core/listeners/collisionListener";
import TickListener from "../../core/listeners/tickListener";
import Entity from "../entity";
import Living from "../living";

export default abstract class Enemy extends Living implements TickListener, ICollisionListener {

    public init() {
        this.gridWorld.addFalling(this);
        this.gridWorld.addCollisionListener(this);
        super.init();
    }

    public tick(): void {
        if (this.position.y >= this.gridWorld.getSize().y) {
            this.scene.removeObject(this)
        }
    }

    public onCollision(entity: Entity) { }

    protected onDeath() {
        this.scene.removeObject(this)
    }
}