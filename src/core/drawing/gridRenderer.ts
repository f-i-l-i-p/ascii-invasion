import GridWorld from "../gridWorld"

export default class GridRenderer {
    private world: GridWorld;
    private context: CanvasRenderingContext2D;

    protected readonly FONT: string;
    protected readonly FONT_RATIO = 1.7;

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

        console.log(grid);
        
        // Fill background
        this.context.fillStyle = "#222";
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.fillStyle = "#FFFFFF";
        this.context.font = "bold " + fontSize + "px Monospace";

        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                this.context.fillText(grid[y][x], x * fontWidth, (y + fontTopOffset) * fontHeight);
            }
        }
    }
}