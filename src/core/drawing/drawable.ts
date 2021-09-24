import Vector from "../vector";

export default interface IDrawable {
    viewTexture(x: number, y: number): string;
    getPosition(): Vector;
    getSize(): Vector;
}