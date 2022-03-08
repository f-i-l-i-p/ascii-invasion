import IDrawable from "../../core/drawing/drawable";
import Color from "../../core/drawing/texture/color";
import Pixel from "../../core/drawing/texture/pixel";
import GridWorld from "../../core/gridWorld";
import Vector from "../../core/vector";
import GameObject from "../../engine/gameObject";

export default class GameText extends GameObject implements IDrawable {
    protected position: Vector;
    protected color: Color;

    private text: string;
    private pixels: Pixel[];

    constructor(world: GridWorld, position: Vector, text: string = '', color: Color = Color.Gray) {
        super(null); // TODO
        this.position = position;
        this.text = text;
        this.color = color;

        this.updatePixels();
    }

    public init() {
        this.gridWorld.addDrawable(this);
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string) {
        this.text = text;
        this.updatePixels();
    }

    public setColor(color: Color) {
        this.color = color;
        this.updatePixels();
    }

    public getPosition(): Vector {
        return this.position.copy();
    }

    public setPosition(position: Vector): void {
        this.position.set(position);
    }

    public getSize(): Vector {
        if (this.text.length > 0) {
            return new Vector(this.text.length, 1);
        } else {
            return new Vector(0, 0);
        }
    }

    public viewPixel(x: number, y: number): Pixel {
        return this.pixels[x];
    }

    private updatePixels(): void {
        this.pixels = [];
        for (let i = 0; i < this.text.length; i++) {
            this.pixels.push({
                char: this.text[i],
                color: this.color,
            })
        }
    }
}