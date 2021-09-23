import Vector from "./vector"

export default class GridWorld {
    private size: Vector;
    private grid: string[][];

    constructor(size: Vector) {
        this.size = size;

        this.grid = [];

        for (let x = 0; x < size.x; x++) {
            this.grid.push([]);
            for (let y = 0; y < size.y; y++) {
                this.grid[x].push("X");
            }
        }

        this.grid[0][0] = "O";
        this.grid[this.size.x - 1][this.size.y - 1] = "O";
    }

    public getSize(): Vector {
        return this.size.copy();
    }

    public viewTile(x: number, y: number): string {
        return this.grid[x][y];
    }

    public pTick(): void {

    }

    public vTick(): void {

    }

    public addObject(object: GameObject) {

    }
}