
import Component from "../engine/component";
import { rockData1 } from "../textures/pixelData";
import createPixels from "../textures/textureMaker";
import Collider from "./collider";
import Falling from "./falling";
import Position from "./position";
import Texture from "./texture";

/**
 */
export default class Enemy extends Component {
    private texture: Texture

    public init(): void {
        this.gameObject.addComponent(Position)
        this.gameObject.addComponent(Falling)

        this.texture = this.gameObject.addComponent(Texture)
        this.texture.setPixels(createPixels(rockData1))

        this.gameObject.addComponent(Collider)
    }

    public update(frame: number): void {
    }
}