import Texture from "../../graphics/texture/texture";
import createPixels from "../../textures/textureMaker";
import { rockData1, rockData2, rockData3, rockData4, rockData5 } from "../../textures/pixelData";
import Enemy from "./enemy";
import Pixel from "../../graphics/texture/pixel";
import Color from "../../graphics/texture/color";

export default class Rock extends Enemy {
    texture = new Texture(createPixels(rockData1));
    mainColors = [Color.Gray, Color.DarkGray];
    health = 5;

    private lastHealth = this.health;

    public tick(): void {
        if (this.health !== this.lastHealth) {
            this.lastHealth = this.health;
            this.updateTexture();
        }
    }

    private updateTexture() {
        let pixels: Pixel[][];
        switch (this.health) {
            case 0:
            case 1:
                pixels = createPixels(rockData5);
                break;
            case 2:
                pixels = createPixels(rockData4);
                break;
            case 3:
                pixels = createPixels(rockData3);
                break;
            case 4:
                pixels = createPixels(rockData2);
                break;
            case 5:
            default:
                pixels = createPixels(rockData1);
                break;
        }
        this.texture = new Texture(pixels);
    }
}