import TestObject from "./newGameObjects/testObject"
import SceneRenderer from "./core/drawing/sceneRenderer"
import Vector from "./core/vector"
import Scene from "./engine/scene"

/**
 * Main class that initializes the game and runs the game loop.
 */
class Game {
    protected scene: Scene
    protected gridRenderer: SceneRenderer

    public init() {
        let canvas: HTMLCanvasElement = document.createElement("canvas")
        document.body.insertBefore(canvas, document.body.childNodes[0])

        let context = canvas.getContext("2d")
        if (!context) {
            throw new Error
        }

		const SCENE_SIZE = new Vector(80, 50)

        this.scene = new Scene(SCENE_SIZE)
        this.scene.addObject(new TestObject())

        this.gridRenderer = new SceneRenderer(this.scene, context)

        setInterval(() => this.tick(), 30)
    }

    private tick() {
        this.scene.tick()
        this.gridRenderer.render()
    }
}

window.onload = () => {
    let game = new Game()
    game.init()
}
