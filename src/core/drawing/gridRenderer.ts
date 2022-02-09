import GridWorld from "../gridWorld"
import Color from "./texture/color";

export default class GridRenderer {
    private world: GridWorld;
    private context: CanvasRenderingContext2D;

    protected readonly FONT = "Ubuntu Mono";
    protected readonly FONT_RATIO = 1.7;

    private colorTable = {
        [Color.Black]: "#0C0C0C",
        [Color.Blue]: "#3B78FF",
        [Color.DarkBlue]: "#0037DA",
        [Color.Cyan]: "#61D6D6",
        [Color.DarkCyan]: "#3A96DD",
        [Color.Gray]: "#CCCCCC",
        [Color.DarkGray]: "#767676",
        [Color.Green]: "#16C60C",
        [Color.DarkGreen]: "#13A10E",
        [Color.Purple]: "#B4009E",
        [Color.DarkPurple]: "#881798",
        [Color.Red]: "#E74856",
        [Color.DarkRed]: "#C50F1F",
        [Color.White]: "#F2F2F2",
        [Color.Yellow]: "#F9F1A5",
        [Color.DarkYellow]: "#C19C00",
    };


    constructor(world: GridWorld, context: CanvasRenderingContext2D) {
        this.world = world;
        this.context = context;
    }

    public render(): void {
        const grid = this.world.viewGrid();

        if (grid.length <= 0)
            return;

        const gridWidth = grid[0].length;
        const gridHeight = grid.length;

        const maxFontWidth = this.context.canvas.width / gridWidth;
        const maxFontHeight = this.context.canvas.height / gridHeight;

        const fontSize = Math.min(maxFontWidth * this.FONT_RATIO, maxFontHeight);
        const fontWidth = fontSize / this.FONT_RATIO;
        const fontHeight = fontSize;

        const fontTopOffset = 0.75;

        // Fill background
        this.context.fillStyle = "#222";
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.font = `${fontSize}px ${this.FONT}`;

        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                if (grid[y][x].char === ' ') {
                    continue;
                }

                const color = this.colorTable[grid[y][x].color];

                this.context.fillStyle = color;
                this.context.fillText(grid[y][x].char, x * fontWidth, (y + fontTopOffset) * fontHeight);
            }
        }
    }
}

