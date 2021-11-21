import Texture from "../core/drawing/texture/texture";
import ICollisionListener from "../core/listeners/collisionListener";
import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import { playerData } from "../textures/pixelData";
import createPixels from "../textures/textureMaker";
import Bullet from "./bullet";
import Entity from "./entity";
import Living from "./living";
import UFO from "./ufo";

export default class Player extends Living implements TickListener, ICollisionListener {
    texture = new Texture(createPixels(playerData));

    public readonly FIRE_DELAY = 5;
    private nextFireTime = 0;
    private fire = false;
    private moveLeft = false;
    private moveRight = false;


    public init() {
        this.gridWorld.addCollisionListener(this);

        window.onkeydown = (event: KeyboardEvent) => {
            if (event.code == "ArrowLeft") {
                this.moveLeft = true;
            }
            if (event.code == "ArrowRight") {
                this.moveRight = true;
            }
            if (event.code == "ArrowUp") {
                this.fire = true;
            }
        }

        window.onkeyup = (event: KeyboardEvent) => {
            if (event.code == "ArrowLeft") {
                this.moveLeft = false;
            }
            if (event.code == "ArrowRight") {
                this.moveRight = false;
            }
            if (event.code == "ArrowUp") {
                this.fire = false;
            }
        }

        super.init();
    }

    public tick(): void {
        if (this.moveLeft && this.position.x > 0) {
            this.position.x--;
        }
        if (this.moveRight && this.position.x < this.gridWorld.getSize().x - this.getSize().x) {
            this.position.x++;
        }

        if (this.fire && this.nextFireTime === 0) {
            this.createBullet();
            this.nextFireTime = this.FIRE_DELAY;
        }
        if (this.nextFireTime > 0) {
            this.nextFireTime--;
        }

        super.tick();
    }

    public onCollision(entity: Entity) {
        if (entity instanceof UFO) {
            entity.destroy();
            this.damage(1);
        }
    }

    public destroy() {
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }

    protected onDeath() {
        this.destroy();
    }

    private createBullet(): void {
        let position = this.getPosition();
        position.y -= 1;
        position.x += Math.floor(this.getSize().x / 2);

        const bullet = new Bullet(this.gridWorld, position, "Player");

        bullet.init();
        this.gridWorld.addObject(bullet);
    }
}
