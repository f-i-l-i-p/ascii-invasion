import GridWorld from "../core/gridWorld";
import ICollisionListener from "../core/listeners/collisionListener";
import IPTickListener from "../core/listeners/pTickListener";
import Vector from "../core/vector";
import Entity from "./entity";
import Player from "./player";
import UFO from "./ufo";

type BulletTypes = "Enemy" | "Player";

export default class Bullet extends Entity implements IPTickListener, ICollisionListener {
    texture = [
        ['|'],
    ];

    public static readonly DAMAGE = 1;
    public static readonly DELAY = 4;
    public readonly type: BulletTypes;

    private counter = 0;

    constructor(world: GridWorld, position: Vector, type: BulletTypes) {
        super(world, position);

        this.type = type;
    }

    public init() {
        this.gridWorld.addPTickListener(this);
        this.gridWorld.addCollisionListener(this);
        super.init();
    }

    public pTick(): void {
        if (this.counter % Bullet.DELAY == 0) {
            if (this.type === "Enemy") {
                this.position.y++;
            } else {
                this.position.y--;
            }
        }

        if (this.position.y < 0 || this.position.y >= this.gridWorld.getSize().y)
        
        this.counter++;
    }

    public onCollision(entity: Entity) {
        if (this.type === "Player" && entity instanceof UFO) {
            entity.damage(Bullet.DAMAGE);
        }
        else if (this.type === "Enemy" && entity instanceof Player) {
            entity.damage(Bullet.DAMAGE);
        }
        this.destroy();
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }
}
