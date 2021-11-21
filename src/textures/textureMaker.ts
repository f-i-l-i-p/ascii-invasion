import Color from "../core/drawing/texture/color";
import Pixel from "../core/drawing/texture/pixel";

export interface PixelData {
    chars: string[],
    colors: string[],
}

const colorMap = {
    'r': Color.Red,
    'R': Color.DarkRed,
    'c': Color.Cyan,
    'C': Color.DarkCyan,
    'y': Color.Yellow,
    'Y': Color.DarkYellow,
    'g': Color.Gray,
    'G': Color.DarkGray,
    'b': Color.Black,
    'w': Color.White,
}

export default function createPixels(pixelData: PixelData): Pixel[][] {
    let pixels: Pixel[][] = [];

    for (let y = 0; y < pixelData.chars.length; y++) {
        let row: Pixel[] = [];
        for (let x = 0; x < pixelData.chars[0].length; x++) {
            row.push({char: pixelData.chars[y][x], color:  colorMap[pixelData.colors[y][x]]})
        }
        pixels.push(row);
    }

    return pixels;
}
