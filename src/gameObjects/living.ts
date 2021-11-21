import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import Entity from "./entity";
import Explosion from "./explosion";

export default abstract class Living extends Entity implements TickListener {
    protected health = 1;

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
        const exp = new Explosion(this.gridWorld, this.position);
        const expSize = exp.getSize();

        const x = this.position.x + Math.floor(this.getSize().x / 2 - expSize.x / 2);
        const y = this.position.y + Math.floor(this.getSize().y / 2 - expSize.y / 2);

        exp.setPosition(new Vector(x, y));

        exp.init();

        this.gridWorld.addObject(exp);
    }
}