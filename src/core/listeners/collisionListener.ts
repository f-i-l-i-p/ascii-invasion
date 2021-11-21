import Entity from "../../gameObjects/entity";

export default interface ICollisionListener extends Entity {
    onCollision(entity: Entity);
}
