import GridWorld from "./core/gridWorld"
import GridRenderer from "./core/drawing/gridRenderer"
import Vector from "./core/vector"

class Game {
	public readonly width: number;
	public readonly height: number;

	protected context: CanvasRenderingContext2D

	protected gridRenderer: GridRenderer;
	protected gridWorld: GridWorld;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

    public init() {
        let canvas: HTMLCanvasElement = document.createElement("canvas")
        canvas.width = this.width * 2;
        canvas.height = this.height * 2;
		canvas.style.width = this.width + "px";
		canvas.style.height = this.height + "px";
        document.body.insertBefore(canvas, document.body.childNodes[0])

        let context = canvas.getContext("2d")
        if (!context) {
            throw new Error
        }

        this.context = context


		this.gridWorld = new GridWorld(new Vector(30, 20));// 80, 50));
		this.gridRenderer = new GridRenderer(this.gridWorld, this.context);
		this.gridWorld.pTick();

		this.gridRenderer.render();

		setInterval(() => this.pTick(), 1000);
    }

	private pTick() {
		this.gridWorld.pTick();

		this.gridRenderer.render();
	}
}

function startGame() {
	let game = new Game(500, 500);
	game.init();
}
window.onload = startGame;

