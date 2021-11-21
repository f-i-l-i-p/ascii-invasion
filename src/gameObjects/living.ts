import IPTickListener from "../core/listeners/pTickListener";
import Entity from "./entity";

export default abstract class Living extends Entity implements IPTickListener {
    protected health = 1;

    public init() {
        this.gridWorld.addPTickListener(this);
        super.init();
    }

    public pTick(): void {
        if (this.health <= 0) {
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
}