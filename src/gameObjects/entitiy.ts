import GameObject from "../core/gameObject";
import Vector from "../core/vector";

export default class Entity extends GameObject {
    protected position: Vector;
    protected texture: string[][];

    public getSize(): Vector {
        if (this.texture.length > 0)
            return new Vector(0, 0);
        else
            return new Vector(this.texture.length, this.texture[0].length);
    }

    public viewTexture(x: number, y: number): string {
        return this.texture[x][y];
    }
}