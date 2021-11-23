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
import GameText from "./texts.ts/gameText";
import ScoreText from "./texts.ts/scoreText";

export default class Player extends Living implements TickListener, ICollisionListener {
    texture = new Texture(createPixels(playerData));
    mainColors = [Color.Red, Color.DarkRed];
    health = 3;

    public readonly FIRE_DELAY = 5;
    private nextFireTime = 0;
    private fire = false;
    private moveLeft = false;
    private moveRight = false;
    private thrust: RocketThrust;

    private score: number = 0;
    private scoreText: ScoreText;

    private healthText: GameText;
    private ammoText: GameText;
    private backgroundAmmoText: GameText;
    private static readonly MAX_AMMO = 50;
    private ammo: number = Player.MAX_AMMO;

    public init() {
        this.gridWorld.addCollisionListener(this);
        this.createThrust();

        this.scoreText = new ScoreText(this.gridWorld);
        this.scoreText.init();
        const ammoPos = new Vector(this.gridWorld.getSize().x - 16, this.gridWorld.getSize().y - 2);
        this.healthText = new GameText(this.gridWorld, new Vector(1, ammoPos.y), '', Color.Red);
        this.ammoText = new GameText(this.gridWorld, ammoPos, '', Color.Yellow);
        this.backgroundAmmoText = new GameText(this.gridWorld, ammoPos, "|||||||||||||||", Color.DarkGray);
        this.backgroundAmmoText.init();
        this.ammoText.init();
        this.healthText.init();

        this.updateHealthText();
        this.updateAmmoText();

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

        if (this.fire && this.nextFireTime === 0 && this.ammo > 0) {
            this.createBullet();
            this.nextFireTime = this.FIRE_DELAY;
            this.ammo--;
            this.updateAmmoText();
        }
        if (this.nextFireTime > 0) {
            this.nextFireTime--;
        }

        this.updateThrustPosition();

        this.scoreText.setScore(this.score);
        this.score++;

        super.tick();
    }

    public onCollision(entity: Entity) {
        if (entity instanceof Enemy) {
            const COLLISION_DAMAGE = 10;
            entity.damage(COLLISION_DAMAGE);
            this.damage(1);
        }
        this.updateHealthText();
    }

    public destroy() {
        this.thrust.destroy();
        this.gridWorld.removeCollisionListener(this);
        super.destroy();
    }

    protected onDeath() {
        this.updateHealthText();
        this.destroy();
    }

    private createBullet(): void {
        let position = this.getPosition();
        position.y -= 1;
        position.x += Math.floor(this.getSize().x / 2);

        const bullet = new Bullet(this.gridWorld, position, "Player");

        bullet.init();
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
    }

    private updateAmmoText(): void {
        let text = '';
        const pins = 15;
        const toDraw = Math.max(pins * this.ammo / Player.MAX_AMMO);
        for (let i = 0; i < toDraw; i++) {
            text += '|';
        }
        this.ammoText.setText(text);
    }

    private updateHealthText(): void {
        let text = '';
        for (let i = 0; i < this.health; i++) {
            text += "A ";
        }
        this.healthText.setText(text);
    }
}
