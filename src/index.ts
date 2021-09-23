
class Game {
	public readonly width: number;
	public readonly height: number;

	protected context: CanvasRenderingContext2D

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

    public init() {
        let canvas: HTMLCanvasElement = document.createElement("canvas")
        canvas.width = this.width
        canvas.height = this.height
        document.body.insertBefore(canvas, document.body.childNodes[0])

        let context = canvas.getContext("2d")
        if (!context) {
            throw new Error
        }

        this.context = context
    }
}

function startGame() {
	let game = new Game(500, 500);
	game.init();
}
window.onload = startGame;

