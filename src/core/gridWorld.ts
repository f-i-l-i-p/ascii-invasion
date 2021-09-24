import Vector from "./vector";
import GameObject from "./gameObject";
import IDrawable from "./drawing/drawable";
import Player from "../gameObjects/player";
import UFO from "../gameObjects/ufo";

export default class GridWorld {
    private size: Vector;

    protected objects: GameObject[] = [];
    protected drawables: IDrawable[] = [new Player(new Vector(5, 5)), new UFO(new Vector(17, 8))];

    constructor(size: Vector) {
        this.size = size;
    }

    public getSize(): Vector {
        return this.size.copy();
    }

    public viewGrid(): string[][] {
        let grid: string[][] = [];

        // Fill with empty spaces
        for (let y = 0; y < this.size.y; y++) {
            let row: string[] = [];
            for (let x = 0; x < this.size.x; x++) {
                row.push(" ");
            }
            grid.push(row);
        }

        for (let i = 0; i < this.drawables.length; i++) {
            let drawable = this.drawables[i];
            let size = drawable.getSize();
            let position = drawable.getPosition();

            for (let y = 0; y < size.y; y++) {
                for (let x = 0; x < size.x; x++) {
                    grid[position.y + y][position.x + x] = drawable.viewTexture(x, y);
                }
            }
        }

        return grid;
    }

    public pTick(): void {

    }

    public vTick(): void {

    }

    public addObject(object: GameObject) {

    }

    public addDrawable(drawable: IDrawable) {

    }
}