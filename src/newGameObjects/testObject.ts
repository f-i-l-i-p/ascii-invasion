import Collider from "../components/collider";
import Falling from "../components/falling";
import Position from "../components/position";
import Texture from "../components/texture";
import GameObject from "../engine/gameObject";
import { rockData1 } from "../textures/pixelData";
import createPixels from "../textures/textureMaker";

export default class TestObject extends GameObject {
    public init(): void {
        console.log("Init test object");
        console.log("Add component: ", this.addComponent(Position))
        console.log("Add component: ", this.addComponent(Falling))

        let texture = this.addComponent(Texture)
        texture.setPixels(createPixels(rockData1))

        console.log("Add component: ", this.addComponent(Collider))
    }
}