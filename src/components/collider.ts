import Vector from "../core/vector";
import Component from "../engine/component";
import GameObject from "../engine/gameObject";
import Position from "./position";
import Texture from "./texture";

/**
 * Collider component that listens for changes from the Position component,
 * and notifies its own listeners on collisions with other colliders.
 */
export default class Collider extends Component {
    private colliders: Collider[]
    private position: Position

    private listeners: ((go: GameObject) => void)[] = []
    private collisionMap: boolean[][] = []
    private collisionSize: Vector

    public init(): void {
        this.colliders = this.gameObject.scene.componentManager.getComponents(Collider)
        this.position = this.gameObject.getComponent(Position)

        // Listen for position updates
        this.gameObject.getComponent(Position).addListener(() => this.check())

        this.setCollisionMap()
    }

    public update(frame: number): void {

    }

    /**
     * Creates a collision map from the texture of the game object.
     */
    private setCollisionMap() {
        const texture = this.gameObject.getComponent(Texture)
        const pixels = texture.getPixels()
        const size = texture.getSize()

        let collisionMap: boolean[][] = Array(size.y)

        for (let y = 0; y < size.y; y++) {
            collisionMap[y] = Array(size.x)
            for (let x = 0; x < size.x; x++) {
                if (pixels[y][x].char !== " " && pixels[y][x].char !== "") {
                    collisionMap[y][x] = true
                } else {
                    collisionMap[y][x] = false
                }
            }
        }

        this.collisionSize = size
        this.collisionMap = collisionMap
    }

    private notifyListeners(go: GameObject) {
        console.log("notify")
        for (let i = 0; i < this.listeners.length; i++) {
            this.listeners[i](go)
        }
    }

    /**
     * Checks for collisions.
     */
    private check() {
        for (let i = 0; i < this.colliders.length; i++) {
            if (this.isColliding(this.colliders[i])) {
                this.notifyListeners(this.colliders[i].gameObject)
            }
        }
    }

    /**
     * Returns true if this collider is colliding with a given collider.
     */
    private isColliding(other: Collider): boolean {
        const pos1 = this.position.get()
        const size1 = this.collisionSize;
        const pos2 = other.position.get();
        const size2 = other.collisionSize;

        const startX = Math.max(pos1.x, pos2.x);
        const endX = Math.min(pos1.x + size1.x - 1, pos2.x + size2.x - 1);

        // If the collision maps are not intersecting horizontally
        if (endX - startX < 0) {
            return false;
        }

        const startY = Math.max(pos1.y, pos2.y)
        const endY = Math.min(pos1.y + size1.y - 1, pos2.y + size2.y - 1);

        // If the collision maps are not intersecting vertically
        if (endY - startY < 0) {
            return false;
        }

        // Check every position in the intersecting collision maps
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                if (this.collisionMap[y - pos1.y][x - pos1.x] && other.collisionMap[y - pos2.y][x - pos2.x]) {
                    return true;
                }
            }
        }
        return false;
    }
}