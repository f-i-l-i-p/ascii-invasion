import Color from "./color";

export default interface Pixel {
    char: string,
    color: Color,
}

export const empty: Pixel = { char: '', color: Color.Black }
