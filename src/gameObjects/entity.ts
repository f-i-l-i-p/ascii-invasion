import IDrawable from "../graphics/drawable";
import Pixel from "../graphics/texture/pixel";
import Texture from "../graphics/texture/texture";
import GridWorld from "../core/gridWorld";
import Vector from "../core/vector";
import GameObject from "../engine/gameObject";

export default class Entity extends GameObject implements IDrawable {
    protected position: Vector;
    protected texture: Texture;

    constructor(world: GridWorld, position: Vector) {
        super(null); // TODO
        this.position = position;
    }

    public init() {
        this.gridWorld.addDrawable(this);
    }

    public getPosition(): Vector {
        return this.position.copy();
    }

    public setPosition(position: Vector): void {
        this.position.set(position);
    }

    public getCenterPosition(): Vector {
        const size = this.getSize();
        const x = this.position.x + Math.floor(size.x / 2);
        const y = this.position.y + Math.floor(size.y / 2);
        return new Vector(x, y);
    }

    public centerAt(position: Vector) {
        const size = this.getSize();
        this.position.x = position.x - Math.floor(size.x / 2);
        this.position.y = position.y - Math.floor(size.y / 2);
    }

    public getSize(): Vector {
        return this.texture.getSize();
    }

    public viewPixel(x: number, y: number): Pixel {
        return this.texture.viewPixel(x, y);
    }
}