import Texture from "../core/drawing/texture/texture";
import GridWorld from "../core/gridWorld";
import ICollisionListener from "../core/listeners/collisionListener";
import IPTickListener from "../core/listeners/pTickListener";
import Vector from "../core/vector";
import createPixels from "../textures/textureMaker";
import { bulletData } from "../textures/pixelData";
import Entity from "./entity";
import Player from "./player";
import UFO from "./ufo";
import Color from "../core/drawing/texture/color";

type BulletTypes = "Enemy" | "Player";

export default class Bullet extends Entity implements IPTickListener, ICollisionListener {
    texture = new Texture(createPixels(bulletData));

    public static readonly DAMAGE = 1;
    public static readonly DELAY = 1;
    public readonly type: BulletTypes;

    private counter = 0;

    constructor(world: GridWorld, position: Vector, type: BulletTypes) {
        super(world, position);

        this.type = type;
    }

    public init() {
        super.init();

        this.gridWorld.addPTickListener(this);
        this.gridWorld.addCollisionListener(this);

        if (this.type === "Player") {
            this.texture.setPixel(0, 0, {char: '|', color: Color.Yellow})
        }
    }

    public pTick(): void {
        if (this.counter % Bullet.DELAY == 0) {
            if (this.type === "Enemy") {
                this.position.y++;
            } else {
                this.position.y--;
            }
        }

        this.counter++;
    }

    public onCollision(entity: Entity) {
        if (this.type === "Player" && entity instanceof UFO) {
            entity.damage(Bullet.DAMAGE);
            this.destroy();
        }
        else if (this.type === "Enemy" && entity instanceof Player) {
            entity.damage(Bullet.DAMAGE);
            this.destroy();
        }
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }
}
