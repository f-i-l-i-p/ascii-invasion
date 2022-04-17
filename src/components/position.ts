import Vector from "../core/vector";
import Component from "../engine/component";

/**
 * Component for storing the position of a game object.
 */
export default class Position extends Component {
    private pos = new Vector(0, 0)
    private listeners: (() => void)[] = []

    public init(): void {

    }

    public update(frame: number): void {

    }

    /**
     * Adds a listener that will be called on every position update.
     */
    public addListener(listener: () => void) {
        this.listeners.push(listener)
    }

    private notifyListeners()  {
        for (let i = 0; i < this.listeners.length; i++) {
            this.listeners[i]()
        }
    }

    public get() {
        return this.pos
    }

    public getX() {
        return this.pos.x
    }

    public getY() {
        return this.pos.y
    }

    public move(dist: Vector) {
        this.pos.add(dist)
        this.notifyListeners()
    } 
    
    public moveX(dist: number) {
        this.pos.x += dist
        this.notifyListeners()
    }
    
    public moveY(dist: number) {
        this.pos.y += dist
        this.notifyListeners()
    }

    public set(pos: Vector) {
        this.pos.set(pos)
        this.notifyListeners()
    }

    public setX(x: number) {
        this.pos.x = x
        this.notifyListeners()
    }

    public setY(y: number) {
        this.pos.y = y
        this.notifyListeners()
    }
}