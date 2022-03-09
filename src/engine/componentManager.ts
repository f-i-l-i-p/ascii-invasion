import Component from "./component"
import GameObject from "./gameObject"

export type cType<T extends Component> = new (go: GameObject) => T

export default class ComponentManger {
    private componentMap: Map<string, Component[]> = new Map()
    private gameObjectMap: Map<GameObject, Component[]> = new Map()

    /**
     * Adds a component to a game object.
     * @param go Game object to add the component to.
     * @param component Component to create.
     * @returns The added component.
     */
    public addComponent<T extends Component>(go: GameObject, component: cType<T>): T {
        let c = new component(go)

        let components: Component[]

        // Add to component map
        components = this.componentMap.get(c.tag)
        if (components !== undefined) {
            components.push(c)
        } else {
            this.componentMap.set(c.tag, [c])
        }

        // Add to game object map
        components = this.gameObjectMap.get(go)
        if (components !== undefined) {
            components.push(c)
        } else {
            this.gameObjectMap.set(go, [c])
        }

        c.init()
        return c
    }

    /**
     * Returns a component for a game object.
     * @param go Game object with component.
     * @param c Component type to get.
     */
    public getComponent<T extends Component>(go: GameObject, c: cType<T>): T {
        const tag = this.getTag(c)
        const components = this.gameObjectMap.get(go)

        for (let i = 0; i < components.length; i++) {
            if (components[i].tag === tag) {
                return components[i] as T
            }
        }

        throw Error(`Cant find component with tag "${tag}"`)
    }

    /**
     * Returns all components of a specified type.
     * @param c Component type
     */
    public getComponents<T extends Component>(c: cType<T>): T[] {
        const components = this.componentMap.get(this.getTag(c))
        if (components === undefined) {
            return []
        } else {
            return components as T[]
        }
    }

    /**
     * Returns all components for a game object.
     */
    public getGoComponents(go: GameObject): Component[] {
        const components = this.gameObjectMap.get(go)
        if (components === undefined) {
            return []
        } else {
            return components
        }
    }

    public onObjectRemoved(go: GameObject): void {
        let toRemove = this.getGoComponents(go)

        if (toRemove === undefined) {
            return
        }

        for (let i = 0; i < toRemove.length; i++) {
            let c = toRemove[i]
            let components = this.componentMap.get(c.tag)
            let index = components.indexOf(c)
            components.splice(index, 1)
        }
        this.gameObjectMap.delete(go)
    }

    private getTag<T extends Component>(c: cType<T>): string {
        return new c(null).tag
    }
}