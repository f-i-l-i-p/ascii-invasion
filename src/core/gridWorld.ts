import Vector from "./vector";
import GameObject from "./gameObject";
import IDrawable from "./drawing/drawable";
import Player from "../gameObjects/player";
import UFO from "../gameObjects/ufo";
import IPTickListener from "./listeners/pTickListener";
import EnemySpawner from "../gameObjects/enemySpawner";
import Box from "../gameObjects/box";

export default class GridWorld {
    private size: Vector;

    protected objects: GameObject[] = [];
    protected drawables: IDrawable[] = [];
    protected pTickListeners: IPTickListener[] = [];

    constructor(size: Vector) {
        this.size = size;

        let spawner = new EnemySpawner(this);
        spawner.init();
        this.objects.push(spawner);

        let player = new Player(this, new Vector(5, 5));
        player.init();
        this.objects.push(player);
        let ufo = new UFO(this, new Vector(17, 0))
        ufo.init();
        this.objects.push(ufo);

        let box = new Box(this, new Vector(0, 0));
        box.init();
        this.objects.push(box);
        box = new Box(this, new Vector(0, size.y - 3));
        box.init();
        this.objects.push(box);
        box = new Box(this, new Vector(size.x - 4, 0));
        box.init();
        this.objects.push(box);
        box = new Box(this, new Vector(size.x - 4, size.y - 3));
        box.init();
        this.objects.push(box);
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
                    if (position.y + y < 0 || position.y + y >= this.size.y || position.x + x < 0 || position.x + x >= this.size.x) {
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
        console.log("New object", object, this.objects.length);
        this.objects.push(object);
    }

    public removeObject(object: GameObject): void {
        let index = this.objects.indexOf(object);
        if (index >= 0) {
            this.objects.splice(index, 1);
        }
        else {
            console.warn("Could not remove object", object);
        }
    }

    public addDrawable(drawable: IDrawable): void {
        this.drawables.push(drawable);
    }

    public removeDrawable(drawable: IDrawable): void {
        let index = this.drawables.indexOf(drawable);
        if (index >= 0) {
            this.drawables.splice(index, 1);
        }
        else {
            console.warn("Could not remove drawable", drawable);
        }
    }

    public addPTickListener(listener: IPTickListener): void {
        this.pTickListeners.push(listener);
    }
    public removePTickListener(listener: IPTickListener): void {
        let index = this.pTickListeners.indexOf(listener);
        if (index >= 0) {
            this.pTickListeners.splice(index, 1);
        }
        else {
            console.warn("Could not remove listener", listener);
        }
    }
}