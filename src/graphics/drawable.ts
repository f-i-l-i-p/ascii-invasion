import Vector from "../core/vector";
import Pixel from "./texture/pixel";

export default interface IDrawable {
    viewPixel(x: number, y: number): Pixel;
    getPosition(): Vector;
    getSize(): Vector;
}