import IDrawable from "../core/drawing/drawable";
import GameObject from "../core/gameObject";
import Vector from "../core/vector";

export default class Entity extends GameObject implements IDrawable {
    protected position: Vector;
    protected texture: string[][];

    constructor(position: Vector) {
        super();
        this.position = position;
    }

    public getPosition(): Vector {
        return this.position.copy();
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
}