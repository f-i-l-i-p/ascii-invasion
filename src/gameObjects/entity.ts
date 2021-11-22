import IDrawable from "../core/drawing/drawable";
import Pixel from "../core/drawing/texture/pixel";
import Texture from "../core/drawing/texture/texture";
import GameObject from "../core/gameObject";
import GridWorld from "../core/gridWorld";
import Vector from "../core/vector";

export default class Entity extends GameObject implements IDrawable {
    protected position: Vector;
    protected texture: Texture;

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

    public getCenterPosition(): Vector {
        const size = this.getSize();
        const x = this.position.x + Math.floor(size.x / 2);
        const y = this.position.y + Math.floor(size.y / 2);
        return new Vector(x, y);
    }

    public setPosition(position: Vector): void {
        this.position.set(position);
    }

    public getSize(): Vector {
        return this.texture.getSize();
    }

    public viewPixel(x: number, y: number): Pixel {
        return this.texture.viewPixel(x, y);
    }

    public destroy() {
        this.gridWorld.removeDrawable(this);
        super.destroy();
    }
}