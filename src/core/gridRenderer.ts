import GridWorld from "./gridWorld"

export default class GridRenderer {
    private world: GridWorld;
    private context: CanvasRenderingContext2D;

    constructor(world: GridWorld, context: CanvasRenderingContext2D) {
        this.world = world;
        this.context = context;
    }

    public render(): void {
        let worldSize = this.world.getSize();

        let tileWidth = this.context.canvas.width / worldSize.x;
        let tileHeight = this.context.canvas.width / worldSize.y;

        let fontSize = Math.min(tileWidth, tileHeight);

        this.context.fillStyle = "#FFFFFF";
        this.context.font = "bold " + fontSize * 1.2 + "px Consolas";

        for (let y = 0; y < worldSize.y; y++) {
            for (let x = 0; x < worldSize.x; x++) {
                let char = this.world.viewTile(x, y);
                this.context.fillText(char, x * tileWidth, y * tileHeight + fontSize);
            }
        }
    }
}