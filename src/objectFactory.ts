import Enemy from "./components/enemy";
import Spawner from "./components/spawner";
import GameObject from "./engine/gameObject";

export function createRock(): GameObject {
    return new GameObject(Enemy)
}

export function createSpawner(): GameObject {
    return new GameObject(Spawner)
}