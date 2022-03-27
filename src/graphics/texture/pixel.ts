import Color from "./color";

export default interface Pixel {
    char: string,
    color: Color,
}

export const emptyPixel: Pixel = { char: '', color: Color.Black }
