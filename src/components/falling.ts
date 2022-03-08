import Component from "../engine/component";
import Position from "./position";

/**
 * Component that makes the game object move downwards.
 */
export default class Falling extends Component {
    private static readonly FALL_DELAY = 8;

    private position: Position
    private maxY: number

    public init(): void {
        this.position = this.gameObject.getComponent(Position)

        this.maxY = this.gameObject.scene.getSize().y - 1
    }

    public update(frame: number): void {
        if (frame % Falling.FALL_DELAY === 0) {
            this.position.moveY(1)

            // Remove game object if it is below the screen
            if (this.position.getY() > this.maxY) {
                this.gameObject.scene.removeObject(this.gameObject)
            }
        }
    }
}