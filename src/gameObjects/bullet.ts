import GridWorld from "../core/gridWorld";
import IPTickListener from "../core/listeners/pTickListener";
import Vector from "../core/vector";
import Entity from "./entity";

type BulletTypes = "Enemy" | "Player";

export default class Bullet extends Entity implements IPTickListener {
    texture = [
        ['|'],
    ];

    public static readonly DELAY = 4;
    public readonly type: BulletTypes;

    private counter = 0;

    constructor(world: GridWorld, position: Vector, type: BulletTypes) {
        super(world, position);

        this.type = type;
    }

    public init() {
        this.gridWorld.addPTickListener(this);
        super.init();
        console.log("AAAAAAAAA");
        
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

    public destroy() {
        this.gridWorld.removePTickListener(this);
        super.destroy();
    }
}
