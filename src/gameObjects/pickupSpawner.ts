import GameObject from "../core/gameObject";
import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import AmmoPickup from "./pickups/ammoPickup";
import HealthPickup from "./pickups/healthPickup";
import Pickup from "./pickups/pickup";

export default class PickupSpawner extends GameObject implements TickListener {
    public static readonly MIN_SPAWN_DELAY = 250;
    public static readonly MAX_SPAWN_DELAY = 750;

    private tickCounter = 0;
    private nextSpawnTime: number;

    public init() {
        this.gridWorld.addPTickListener(this);
        this.setNextSpawnTime();
    }

    public tick(): void {
        if (this.tickCounter >= this.nextSpawnTime) {
            this.spawnPickup();
            this.setNextSpawnTime();
            this.tickCounter = 0;
        }

        this.tickCounter++;
    }

    private spawnPickup() {
        const pickup = this.createPickup();
        const size = pickup.getSize();

        const x = Math.floor(Math.random() * (this.gridWorld.getSize().x - size.x + 1));
        const y = -size.y;

        pickup.setPosition(new Vector(x, y));
        pickup.init();
    }

    private createPickup(): Pickup {
        const random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
            case 1:
                return new AmmoPickup(this.gridWorld, new Vector(0, 0));
            case 2:
                return new HealthPickup(this.gridWorld, new Vector(0, 0));
        }
    }

    private setNextSpawnTime() {
        this.nextSpawnTime = Math.random() * (PickupSpawner.MAX_SPAWN_DELAY - PickupSpawner.MIN_SPAWN_DELAY) + PickupSpawner.MIN_SPAWN_DELAY;
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
    }
}