import Color from "../../core/drawing/texture/color";
import Texture from "../../core/drawing/texture/texture";
import createPixels from "../../textures/textureMaker";
import { ufoData } from "../../textures/pixelData";
import Bullet from "../bullet";
import Enemy from "./enemy";

export default class UFO extends Enemy {
    texture = new Texture(createPixels(ufoData));
    mainColors = [Color.Cyan, Color.Cyan, Color.DarkCyan, Color.DarkCyan, Color.DarkYellow];
    health = 3;

    private static readonly FIRE_DELAY = 120;
    private static readonly ANIMATION_DELAYl = 5;
    private animationCounter = 0;
    private animationDirection = 1;
    private counter = 0;

    public tick(): void {
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
    
    private createBullet(): void {
        let position = this.getPosition();
        position.y = this.position.y + this.getSize().y;
        position.x += Math.floor(this.getSize().x / 2);

        const bullet = new Bullet(this.gridWorld, position, "Enemy");

        bullet.init();
    }
}