import GridWorld from "../gridWorld"

export default class GridRenderer {
    private world: GridWorld;
    private context: CanvasRenderingContext2D;

    protected readonly FONT: string;

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

        const tileWidth = this.context.canvas.width / gridWidth;
        const tileHeight = this.context.canvas.height / gridHeight;
        const fontSize = Math.min(tileWidth, tileHeight);

        // Fill background
        this.context.fillStyle = "#222";
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.fillStyle = "#FFFFFF";
        this.context.font = "bold " + fontSize + "px Monospace";

        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                this.context.fillText(grid[y][x], x * fontSize * 0.60, y * fontSize * 1.17 + fontSize);
            }
        }
    }
}