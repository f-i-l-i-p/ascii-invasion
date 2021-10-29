import GridWorld from "./gridWorld";
import IPTickListener from "./listeners/pTickListener";

export default class GameObject {
    private gridWorld: GridWorld;

    constructor(gridWorld: GridWorld) {
        this.gridWorld = gridWorld;
    }

    public init(): void {}

    // TODO: Move this function to an instantiate class
    public instantiate(gameObject: GameObject) {
        () => this.gridWorld.addObject(gameObject);
        gameObject.init();
    }

    public startPTickListening(listener: IPTickListener) {
        this.gridWorld.addPTickListener(listener);
    }
}