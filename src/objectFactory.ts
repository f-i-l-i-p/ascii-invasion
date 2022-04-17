import Enemy from "./components/enemy";
import Player from "./components/player";
import Spawner from "./components/spawner";
import GameObject from "./engine/gameObject";

export function createRock(): GameObject {
    return new GameObject(Enemy)
}

export function createSpawner(): GameObject {
    return new GameObject(Spawner)
}

export function createPlayer(): GameObject {
    return new GameObject(Player)
}

export function createPlayerBullet(): GameObject {
    throw new Error("Method not implemented.");
}