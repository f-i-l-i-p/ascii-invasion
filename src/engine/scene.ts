import Vector from "../core/vector";
import ComponentManger from "./componentManager";
import GameObject from "./gameObject";

export default class Scene {
    private frameCounter = 0
    private gameObjects: GameObject[] = []
    private size: Vector
    
    public componentManager = new ComponentManger()

    constructor(size: Vector) {
        this.size = size
    }

    public getSize(): Vector {
        return this.size.copy()
    }

    /**
     * Looks for a game object with a specific tag.
     */
    public findObject(tag: string): GameObject | undefined {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].tag === tag) {
                return this.gameObjects[i]
            }
        }
        return undefined
    }

    /**
     * Adds a game object to the scene.
     */
    public addObject(go: GameObject) {
        this.gameObjects.push(go)
        go.scene = this
        go.init()
    }

    /**
     * Removes a game object from the scene.
     */
    public removeObject(go: GameObject) {
        const index = this.gameObjects.indexOf(go)

        if (index === -1) {
            throw new Error("Object does not exist in scene")
        }

        this.gameObjects.splice(index, 1)
        this.componentManager.onObjectRemoved(go)
    }

    public tick() {
        for (let go of this.gameObjects) {
            go.tick(this.frameCounter)
        }

        this.frameCounter++;
    }
}