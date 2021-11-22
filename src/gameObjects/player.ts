import Color from "../core/drawing/texture/color";
import Texture from "../core/drawing/texture/texture";
import ICollisionListener from "../core/listeners/collisionListener";
import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import { playerData } from "../textures/pixelData";
import createPixels from "../textures/textureMaker";
import Bullet from "./bullet";
import Enemy from "./enemies/enemy";
import Entity from "./entity";
import Living from "./living";
import RocketThrust from "./particles/rocketThrust";

export default class Player extends Living implements TickListener, ICollisionListener {
    texture = new Texture(createPixels(playerData));
    mainColors = [Color.Red, Color.DarkRed];

    public readonly FIRE_DELAY = 5;
    private nextFireTime = 0;
    private fire = false;
    private moveLeft = false;
    private moveRight = false;
    private thrust: RocketThrust;


    public init() {
        this.gridWorld.addCollisionListener(this);
        this.createThrust();

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

        this.updateThrustPosition();

        super.tick();
    }

    public onCollision(entity: Entity) {
        if (entity instanceof Enemy) {
            entity.destroy();
            this.damage(1);
        }
    }

    public destroy() {
        this.thrust.destroy();
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

    private updateThrustPosition(): void {
        const OFFSET = 5;
        const x = Math.floor(this.position.x + this.getSize().x / 2 - this.thrust.getSize().x / 2);
        const y = this.position.y + OFFSET;

        this.thrust.setPosition(new Vector(x, y))
    }

    private createThrust(): void {
        this.thrust = new RocketThrust(this.gridWorld, new Vector(0, 0));

        this.updateThrustPosition();

        this.thrust.init();
        this.gridWorld.addObject(this.thrust);
    }
}
