import Collider from "../components/collider";
import Falling from "../components/falling";
import Position from "../components/position";
import Texture from "../components/texture";
import GameObject from "../engine/gameObject";
import { rockData1, rockData2, rockData3, rockData4, rockData5 } from "../textures/pixelData";
import createPixels, { PixelData } from "../textures/textureMaker";

export default class Rock extends GameObject {
    private texture: Texture

    public init(): void {
        this.addComponent(Position)
        this.addComponent(Falling)
        this.texture = this.addComponent(Texture)
        this.addComponent(Collider)

        this.updateTexture()
    }

    private updateTexture() {
        let health = 5

        let pd: PixelData
        switch (health) {
            case 1:
                pd = rockData5
                break;
            case 2:
                pd = rockData4
                break;
            case 3:
                pd = rockData3
                break;
            case 4:
                pd = rockData2
                break;
            case 5:
                pd = rockData1
                break
        }
        this.texture.setPixels(createPixels(pd))
    }
}