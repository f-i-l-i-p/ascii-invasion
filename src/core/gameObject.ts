import GridWorld from "./gridWorld";

export default class GameObject {
    protected gridWorld: GridWorld;

    constructor(gridWorld: GridWorld) {
        this.gridWorld = gridWorld;
    }

    public init(): void {}

    public destroy(): void {}
}