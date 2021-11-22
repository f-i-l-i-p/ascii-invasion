import Texture from "../core/drawing/texture/texture";
import GridWorld from "../core/gridWorld";
import ICollisionListener from "../core/listeners/collisionListener";
import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import createPixels from "../textures/textureMaker";
import { bulletData } from "../textures/pixelData";
import Entity from "./entity";
import Player from "./player";
import Color from "../core/drawing/texture/color";
import Explosion from "./particles/explosion";
import Living from "./living";
import Enemy from "./enemies/enemy";

type BulletTypes = "Enemy" | "Player";

export default class Bullet extends Entity implements TickListener, ICollisionListener {
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
            this.texture.setPixel(0, 0, { char: '|', color: Color.Yellow })
        }
    }

    public tick(): void {
        if (this.counter % Bullet.DELAY == 0) {
            if (this.type === "Enemy") {
                this.position.y++;
            } else {
                this.position.y--;
            }
        }

        if (this.position.y < 0 || this.position.y >= this.gridWorld.getSize().y) {
            this.destroy();
        }

        this.counter++;
    }

    public onCollision(entity: Entity) {
        if (this.type === "Player" && entity instanceof Enemy) {
            this.onHit(entity)
        }
        else if (this.type === "Enemy" && entity instanceof Player) {
            this.onHit(entity)
        }
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }

    private onHit(living: Living) {
        living.damage(Bullet.DAMAGE);

        let colors: Color[];

        if (this.type === "Enemy") {
            colors = [Color.Red, Color.DarkRed];
        } else {
            colors = [Color.Yellow, Color.DarkYellow];
        }

        Explosion.explodeAt(this.gridWorld, this.getCenterPosition(), colors, true, 10);

        this.destroy();
    }
}
