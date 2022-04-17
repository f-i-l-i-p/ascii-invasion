import GridWorld from "../core/gridWorld";
import Component from "./component";
import { ComponentType } from "./componentManager";
import Scene from "./scene";

export default class GameObject {
    protected gridWorld: GridWorld // TODO: Remove

    public tag: string = ""
    public scene: Scene

    private waitingComponents: ComponentType<Component>[]

    constructor(...components: ComponentType<Component>[]) {
        this.waitingComponents = [...components]
    }

    /**
     * Sets the scene for this game object.
     */
    public setScene(scene: Scene): void {
        this.scene = scene

        // Add waiting components
        this.waitingComponents.forEach(c => {
            this.scene.componentManager.addComponent(this, c)
        })
        this.waitingComponents = []
    }

    /**
     * Adds a component to this game object.
     * If the scene has not been set, the component will be added once it is set.
     */
    public addComponent<T extends Component>(component: ComponentType<T>): T {
        if (!this.scene) {
            this.waitingComponents.push(component)
        } else {
            return this.scene.componentManager.addComponent(this, component)
        }
    }

    public getComponent<T extends Component>(component: ComponentType<T>): T {
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
    public init(): void { }
}
