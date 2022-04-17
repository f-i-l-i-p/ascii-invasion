import Vector from "../core/vector";
import Component from "../engine/component";
import { createPlayerBullet } from "../objectFactory";
import { playerData } from "../textures/pixelData";
import createPixels from "../textures/textureMaker";
import Position from "./position";
import Texture from "./texture";

/**
 * Component that controls the player.
 */
export default class Player extends Component {
    FIRE_DELAY = 10
    BOTTOM_OFFSET = 4

    position: Position
    texture: Texture
    ammo: number = 10
    nextFireTime: number = 0
    alive = true
    moveLeft = false
    moveRight = false
    fire = false

    public init(): void {
        this.position = this.gameObject.addComponent(Position)
        this.texture = this.gameObject.addComponent(Texture)

        this.texture.setPixels(createPixels(playerData))

        this.position.setX(Math.round(this.gameObject.scene.getSize().x / 2 - this.texture.getSize().x / 2))
        this.position.setY(this.gameObject.scene.getSize().y - this.texture.getSize().y - this.BOTTOM_OFFSET)

        this.setupKeys()
    }

    public update(frame: number): void {
        // Movement
        if (this.moveLeft && this.position.getX() > 0) {
            this.position.moveX(-1)
        }
        if (this.moveRight && this.position.getX() + this.texture.getSize().x < this.gameObject.scene.getSize().x) {
            this.position.moveX(1)
        }

        // Shooting
        if (this.fire && this.nextFireTime === 0 && this.ammo > 0) {
            this.createBullet()
            this.nextFireTime = this.FIRE_DELAY
            this.ammo--
        }
        if (this.nextFireTime > 0) {
            this.nextFireTime--
        }
    }

    /**
     * Creates a bullet and adds it to the scene.
     */
    private createBullet(): void {
        let bullet = createPlayerBullet()
        // Set the bullet's position to the player's position
        let x = this.position.getX() + this.texture.getSize().x / 2
        let y = this.position.getY() - 1
        bullet.getComponent(Position).set(new Vector(x, y))
        // Add the bullet to the scene
        this.gameObject.scene.addObject(bullet)
    }

    private setupKeys(): void {
        window.onkeydown = (event: KeyboardEvent) => {
            if (event.code == "ArrowLeft") {
                this.moveLeft = true
            }
            if (event.code == "ArrowRight") {
                this.moveRight = true
            }
            if (event.code == "ArrowUp") {
                this.fire = true
            }
        }

        window.onkeyup = (event: KeyboardEvent) => {
            if (event.code == "ArrowLeft") {
                this.moveLeft = false
            }
            if (event.code == "ArrowRight") {
                this.moveRight = false
            }
            if (event.code == "ArrowUp") {
                this.fire = false
            }
        }
    }
}