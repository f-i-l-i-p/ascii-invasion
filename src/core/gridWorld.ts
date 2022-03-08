import Vector from "./vector";
import IDrawable from "./drawing/drawable";
import Player from "../gameObjects/player";
import TickListener from "./listeners/tickListener";
import EnemySpawner from "../gameObjects/enemySpawner";
import Entity from "../gameObjects/entity";
import ICollisionListener from "./listeners/collisionListener";
import Pixel, { emptyPixel } from "./drawing/texture/pixel";
import PickupSpawner from "../gameObjects/pickupSpawner";

export default class GridWorld {
    private size: Vector;
    private pTickCounter = 0;

    protected drawables: IDrawable[] = [];
    protected pTickListeners: TickListener[] = [];
    protected collisionListeners: ICollisionListener[] = [];
    protected falling: Entity[] = [];

    private readonly FALL_DELAY = 8;

    constructor(size: Vector) {
        this.size = size;

        /*
        let enemySpawner = new EnemySpawner(this);
        enemySpawner.init();

        let pickupSpawner = new PickupSpawner(this);
        pickupSpawner.init();

        let player = new Player(this, new Vector(size.x / 2 - 3, size.y - 8));
        player.init();
        */
    }

    public getSize(): Vector {
        return this.size.copy();
    }

    public viewGrid(): Pixel[][] {
        let grid: Pixel[][] = [];

        // Fill with empty spaces
        for (let y = 0; y < this.size.y; y++) {
            let row: Pixel[] = [];
            for (let x = 0; x < this.size.x; x++) {
                row.push(emptyPixel);
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

                    const texture = drawable.viewPixel(x, y);
                    if (texture.char === ' ' || texture.char === '') {
                        continue;
                    }

                    if (texture.color === undefined) {
                        throw new Error("Color is undefined")
                    }

                    grid[position.y + y][position.x + x] = texture;
                }
            }
        }

        return grid;
    }

    public tick(): void {
        for (let i = 0; i < this.pTickListeners.length; i++) {
            this.pTickListeners[i].tick();
        }

        if (this.pTickCounter % this.FALL_DELAY == 0) {
            for (let i = 0; i < this.falling.length; i++) {
                let pos = this.falling[i].getPosition();
                pos.y++;
                this.falling[i].setPosition(pos);
            }
        }

        this.notifyCollisions();

        this.pTickCounter++;
    }

    private notifyCollisions() {
        for (let i = 0; i < this.collisionListeners.length - 1; i++) {
            const entity1 = this.collisionListeners[i];
            for (let j = i + 1; j < this.collisionListeners.length; j++) {
                const entity2 = this.collisionListeners[j];

                if (this.isColliding(entity1, entity2)) {
                    entity1.onCollision(entity2);
                    entity2.onCollision(entity1);
                }
            }
        }
    }

    private isColliding(entity1: Entity, entity2: Entity): boolean {
        const pos1 = entity1.getPosition();
        const size1 = entity1.getSize();
        const pos2 = entity2.getPosition();
        const size2 = entity2.getSize();

        const startX = Math.max(pos1.x, pos2.x);
        const endX = Math.min(pos1.x + size1.x - 1, pos2.x + size2.x - 1);

        const startY = Math.max(pos1.y, pos2.y)
        const endY = Math.min(pos1.y + size1.y - 1, pos2.y + size2.y - 1);

        if (endX - startX < 0 || endY - startY < 0) {
            return false;
        }

        // Check each pixel
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                if (entity1.viewPixel(x - pos1.x, y - pos1.y).char !== ' ' && entity2.viewPixel(x - pos2.x, y - pos2.y).char !== ' ') {
                    return true;
                }
            }
        }
        return false;
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

    public addPTickListener(listener: TickListener): void {
        this.pTickListeners.push(listener);
    }
    public removePTickListener(listener: TickListener): void {
        let index = this.pTickListeners.indexOf(listener);
        if (index >= 0) {
            this.pTickListeners.splice(index, 1);
        }
        else {
            console.warn("Could not remove listener", listener);
        }
    }

    public addFalling(falling: Entity): void {
        this.falling.push(falling);
    }
    public removeFalling(falling: Entity): void {
        let index = this.falling.indexOf(falling);
        if (index >= 0) {
            this.falling.splice(index, 1);
        }
        else {
            console.warn("Could not remove falling", falling);
        }
    }

    public addCollisionListener(listener: ICollisionListener): void {
        this.collisionListeners.push(listener);
    }
    public removeCollisionListener(listener: ICollisionListener): void {
        let index = this.collisionListeners.indexOf(listener);
        if (index >= 0) {
            this.collisionListeners.splice(index, 1);
        }
        else {
            console.warn("Could not remove collision listener", listener);
        }
    }
}