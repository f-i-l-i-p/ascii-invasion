import Vector from "../vector";
import Pixel from "./texture/pixel";

export default interface IDrawable {
    viewPixel(x: number, y: number): Pixel;
    getPosition(): Vector;
    getSize(): Vector;
}