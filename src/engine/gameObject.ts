import GridWorld from "../core/gridWorld";
import Component from "./component";
import { cType } from "./componentManager";
import Scene from "./scene";

export default abstract class GameObject {
    protected gridWorld: GridWorld // TODO: Remove

    public tag: string = ""
    public scene: Scene

    constructor(ignored?: any) { } // TODO: Remove constructor

    public addComponent<T extends Component>(component: cType<T>): T {
        return this.scene.componentManager.addComponent(this, component)
    }

    public getComponent<T extends Component>(component: cType<T>): T {
        return this.scene.componentManager.getComponent(this, component)
    }

    public tickGameObject(frame: number) {
        this.onTick(frame)

        let components = this.scene.componentManager.getGoComponents(this)
        for (let i = 0; i < components.length; i++) {
            components[i].update(frame)
        }
    }

    protected onTick(frame: number): void { }

    /**
     * Initializes this game object.
     */
    public abstract init(): void
}
