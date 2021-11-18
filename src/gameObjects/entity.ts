import IDrawable from "../core/drawing/drawable";
import GameObject from "../core/gameObject";
import GridWorld from "../core/gridWorld";
import Vector from "../core/vector";

export default class Entity extends GameObject implements IDrawable {
    protected position: Vector;
    protected texture: string[][];

    constructor(world: GridWorld, position: Vector) {
        super(world);
        this.position = position;
    }
    
    public init() {
        this.gridWorld.addDrawable(this);
        super.init();
    }

    public getPosition(): Vector {
        return this.position.copy();
    }

    public setPosition(position: Vector): void {
        this.position.set(position);
    }

    public getSize(): Vector {
        if (this.texture.length == 0)
            return new Vector(0, 0);
        else
            return new Vector(this.texture[0].length, this.texture.length);
    }

    public viewTexture(x: number, y: number): string {
        return this.texture[y][x];
    }

    public destroy() {
        this.gridWorld.removeDrawable(this);
        super.destroy();
    }
}