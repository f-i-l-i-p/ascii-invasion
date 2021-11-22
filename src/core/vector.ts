
/**
 * A 2D vector.
 */
export default class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public set(vector: Vector): void {
        this.x = vector.x;
        this.y = vector.y;
    }

    public add(vector: Vector): void {
        this.x += vector.x;
        this.y += vector.y;
    }

    public multiply(value: number): void {
        this.x *= value;
        this.y *= value;
    }

    public copy(): Vector {
        return new Vector(this.x, this.y);
    }
}