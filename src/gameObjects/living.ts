import Color from "../core/drawing/texture/color";
import TickListener from "../core/listeners/tickListener";
import Entity from "./entity";
import Explosion from "./explosion";

export default abstract class Living extends Entity implements TickListener {
    protected health = 1;
    protected mainColors: Color[];

    public init() {
        this.gridWorld.addPTickListener(this);
        super.init();
    }

    public tick(): void {
        if (this.health <= 0) {
            this.explode();
            this.onDeath();
        }
    }

    public getHealth(): number {
        return this.health;
    }

    public giveHealth(amount: number): void {
        this.health += amount;
    }

    public damage(amount: number): void {
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    public destroy(): void {
        this.gridWorld.removePTickListener(this);
        super.destroy();
    }

    protected abstract onDeath(): void;

    protected explode(): void {
        Explosion.explodeAt(this.gridWorld, this.getCenterPosition(), this.mainColors, true, 100);
    }
}