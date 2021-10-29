import Vector from "./vector";
import GameObject from "./gameObject";
import IDrawable from "./drawing/drawable";
import Player from "../gameObjects/player";
import UFO from "../gameObjects/ufo";
import IPTickListener from "./listeners/pTickListener";

export default class GridWorld {
    private size: Vector;

    protected objects: GameObject[] = [];
    protected drawables: IDrawable[] = [];
    protected pTickListeners: IPTickListener[] = [];

    constructor(size: Vector) {
        this.size = size;

        let player = new Player(this, new Vector(5, 5));
        player.init();
        this.drawables.push(player);
        let ufo = new UFO(this, new Vector(17, 0))
        ufo.init();
        this.drawables.push(ufo);
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
                    // If outside grid
                    if (position.y + y < 0 || position.y + y >= this.size.y || position.x + x < 0 || position.x + x > this.size.x) {
                        continue;
                    }
                    grid[position.y + y][position.x + x] = drawable.viewTexture(x, y);
                }
            }
        }

        return grid;
    }

    public pTick(): void {
        for (let i = 0; i < this.pTickListeners.length; i++) {
            this.pTickListeners[i].pTick();
        }
    }

    public vTick(): void {

    }

    public addObject(object: GameObject): void {

    }

    public addDrawable(drawable: IDrawable): void {

    }

    public addPTickListener(listener: IPTickListener): void {
        this.pTickListeners.push(listener);
    }
}