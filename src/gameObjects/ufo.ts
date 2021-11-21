import Color from "../core/drawing/texture/color";
import Texture from "../core/drawing/texture/texture";
import ICollisionListener from "../core/listeners/collisionListener";
import TickListener from "../core/listeners/tickListener";
import createPixels from "../textures/textureMaker";
import { ufoData } from "../textures/pixelData";
import Entity from "./entity";
import Living from "./living";
import Bullet from "./bullet";

export default class UFO extends Living implements TickListener, ICollisionListener {
    texture = new Texture(createPixels(ufoData));

    private static readonly HEALTH = 3;
    private static readonly FIRE_DELAY = 120;
    private static readonly ANIMATION_DELAYl = 5;
    private animationCounter = 0;
    private animationDirection = 1;
    private counter = 0;

    public init() {
        this.health = UFO.HEALTH;

        this.gridWorld.addFalling(this);
        this.gridWorld.addCollisionListener(this);
        super.init();
    }

    public tick(): void {
        if (this.position.y >= this.gridWorld.getSize().y) {
            this.destroy();
        }

        if (this.counter % UFO.FIRE_DELAY === 0) {
            this.createBullet();
        }

        if (this.counter % UFO.ANIMATION_DELAYl === 0) {
            this.texture.setPixel(2 + 2 * this.animationCounter, 2, { char: '~', color: Color.DarkYellow });

            this.animationCounter += this.animationDirection;
            if (this.animationCounter == 0 || this.animationCounter == 4) {
                this.animationDirection *= -1;
            }

            this.texture.setPixel(2 + 2 * this.animationCounter, 2, { char: '~', color: Color.Yellow });
        }
        this.counter++;

        super.tick();
    }

    public onCollision(entity: Entity) {
    }

    public destroy() {
        this.gridWorld.removeFalling(this);
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }

    protected onDeath() {
        this.destroy();
    }
    
    private createBullet(): void {
        let position = this.getPosition();
        position.y = this.position.y + this.getSize().y;
        position.x += Math.floor(this.getSize().x / 2);

        const bullet = new Bullet(this.gridWorld, position, "Enemy");

        bullet.init();
        this.gridWorld.addObject(bullet);
    }
}