import Color from "../../core/drawing/texture/color";
import CollisionListener from "../../core/listeners/collisionListener";
import TickListener from "../../core/listeners/tickListener";
import Vector from "../../core/vector";
import Entity from "../entity";
import Player from "../player";

export default abstract class Pickup extends Entity implements TickListener, CollisionListener {
    protected health = 1;
    protected mainColors: Color[];

    private animationPos = new Vector(0, 0)
    private animationActiveColor = Color.Yellow;
    private animationInactiveColor = Color.DarkYellow;

    public init() {
        this.gridWorld.addFalling(this);
        this.gridWorld.addPTickListener(this);
        this.gridWorld.addCollisionListener(this);
        super.init();
    }

    public tick(): void {
        this.updateAnimation();

        if (this.position.y >= this.gridWorld.getSize().y) {
            this.scene.removeObject(this)
        }
    }

    public onCollision(entity: Entity) {
        if (entity instanceof Player) {
            this.onPlayerCollision(entity);
            this.scene.removeObject(this)
        }
    }

    protected abstract onPlayerCollision(player: Player);

    private updateAnimation() {
        const size = this.getSize();

        let inactivePixel = this.texture.viewPixel(this.animationPos.x, this.animationPos.y);
        inactivePixel.color = this.animationInactiveColor;

        if (this.animationPos.x === 0 && this.animationPos.y > 0) {
            this.animationPos.y--;
        }
        else if (this.animationPos.y === size.y - 1) {
            this.animationPos.x--;
        }
        else if (this.animationPos.x === size.x - 1) {
            this.animationPos.y++;
        }
        else {
            this.animationPos.x++;
        }
        
        let activePixel = this.texture.viewPixel(this.animationPos.x, this.animationPos.y);
        activePixel.color = this.animationActiveColor;
    }
}