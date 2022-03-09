import Pixel from "../core/drawing/texture/pixel";
import Vector from "../core/vector";
import Component from "../engine/component";
import Position from "./position";

export default class Texture extends Component {
    private pixels: Pixel[][] = []
    public position: Position

    public init(): void {
        this.position = this.gameObject.getComponent(Position)
    }

    public update(frame: number): void {

    }

    public getSize(): Vector {
        if (this.pixels.length == 0)
            return new Vector(0, 0);
        else
            return new Vector(this.pixels[0].length, this.pixels.length);
    }

    public isEmpty(x: number, y: number): boolean {
        if (this.isOutOfRange(x, y)) {
            throw new RangeError();
        }
        return this.pixels[y][x].char === ' ';
    }

    public viewPixel(x: number, y: number): Pixel {
        if (this.isOutOfRange(x, y)) {
            throw new RangeError();
        }
        return this.pixels[y][x];
    }

    public setPixel(x: number, y: number, pixel: Pixel): void {
        if (this.isOutOfRange(x, y)) {
            throw new RangeError();
        }
        this.pixels[y][x] = pixel;
    }

    public setPixels(pixels: Pixel[][]): void {
        this.pixels = pixels;
    }

    public getPixels(): Pixel[][] {
        return this.pixels
    }

    private isOutOfRange(x: number, y: number): boolean {
        return y < 0 || x < 0 || y >= this.pixels.length || x >= this.pixels[0].length;
    }
}
