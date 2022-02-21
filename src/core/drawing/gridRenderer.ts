import GridWorld from "../gridWorld"
import Color from "./texture/color";

export default class GridRenderer {
    private world: GridWorld
    private context: CanvasRenderingContext2D

    private readonly FONT = "Ubuntu Mono"
    /** How tall the font is relative to its width. */
    private readonly FONT_RATIO = 1.9

    private readonly BACKGROUND_COLOR = "#222"

    private readonly COLOR_TABLE = {
        [Color.Black]: "#0C0C0C",
        [Color.Blue]: "#3B78FF",
        [Color.Cyan]: "#61D6D6",
        [Color.Gray]: "#CCCCCC",
        [Color.Green]: "#16C60C",
        [Color.Purple]: "#B4009E",
        [Color.Red]: "#E74856",
        [Color.White]: "#F2F2F2",
        [Color.Yellow]: "#F9F1A5",
        [Color.DarkBlue]: "#0037DA",
        [Color.DarkCyan]: "#3A96DD",
        [Color.DarkGray]: "#767676",
        [Color.DarkGreen]: "#13A10E",
        [Color.DarkPurple]: "#881798",
        [Color.DarkRed]: "#C50F1F",
        [Color.DarkYellow]: "#C19C00",
    };

    constructor(world: GridWorld, context: CanvasRenderingContext2D) {
        this.world = world
        this.context = context
    }

    /**
     * Updates the canvas size to fill the window.
     */
    private updateCanvasSize(): void {
        const worldSize = this.world.getSize()

        // Canvas size without scaling
        const width = worldSize.x
        const height = worldSize.y * this.FONT_RATIO

        // Calculate max canvas scaling factor
        const scaling_factor = Math.min(window.innerWidth / width, window.innerHeight / height)

        this.context.canvas.width = width * scaling_factor
        this.context.canvas.height = height * scaling_factor
    }

    /**
     * Redraws the content of the world to the canvas.
     */
    public render(): void {
        this.updateCanvasSize()

        const grid = this.world.viewGrid()
        if (grid.length <= 0)
            return;

        const gridSize = this.world.getSize()
        const charWidth = this.context.canvas.width / gridSize.x
        const charHeight = this.context.canvas.height / gridSize.y

        // Fill background
        this.context.fillStyle = this.BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        // Draw world
        this.context.font = `${charHeight}px ${this.FONT}`;
        for (let y = 0; y < gridSize.y; y++) {
            for (let x = 0; x < gridSize.x; x++) {
                const pixel = grid[y][x]

                if (pixel.char === ' ') {
                    continue;
                }

                const color = this.COLOR_TABLE[pixel.color];
                this.context.fillStyle = color;

                this.context.fillText(pixel.char, x * charWidth, (y + 1) * charHeight);
            }
        }
    }
}

