import GridWorld from "./core/gridWorld"
import GridRenderer from "./core/drawing/gridRenderer"
import Vector from "./core/vector"

/**
 * Main class that initializes the game and runs the game loop.
 */
class Game {
    protected gridWorld: GridWorld
    protected gridRenderer: GridRenderer

    public init() {
        let canvas: HTMLCanvasElement = document.createElement("canvas")
        document.body.insertBefore(canvas, document.body.childNodes[0])

        let context = canvas.getContext("2d")
        if (!context) {
            throw new Error
        }

		const WORLD_SIZE = new Vector(80, 50)

        this.gridWorld = new GridWorld(WORLD_SIZE)
        this.gridRenderer = new GridRenderer(this.gridWorld, context)

        setInterval(() => this.tick(), 30)
    }

    private tick() {
        this.gridWorld.tick()
        this.gridRenderer.render()
    }
}

window.onload = () => {
    let game = new Game()
    game.init()
}
