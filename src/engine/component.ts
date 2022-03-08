import GameObject from "./gameObject";

export default abstract class Component {
    protected gameObject: GameObject
    public readonly tag: string

    constructor(go: GameObject) {
        this.gameObject = go
        this.tag = this.constructor.name
    }

    public abstract init(): void

    public abstract update(frame: number): void;
}