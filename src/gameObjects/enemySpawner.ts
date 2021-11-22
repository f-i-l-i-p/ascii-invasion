import GameObject from "../core/gameObject";
import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import Enemy from "./enemies/enemy";
import Rock from "./enemies/rock";
import UFO from "./enemies/ufo";

export default class EnemySpawner extends GameObject implements TickListener {
    public static readonly SPAWN_DELAY = 50;

    private tickCounter = 0;

    public init() {
        this.gridWorld.addPTickListener(this);
    }

    public tick(): void {
        if (this.tickCounter >= EnemySpawner.SPAWN_DELAY) {
            this.spawnEnemy();
            this.tickCounter = 0;
        }

        this.tickCounter++;
    }

    private spawnEnemy() {
        const enemy = this.createEnemy();
        const enemySize = enemy.getSize();

        const x = Math.floor(Math.random() * (this.gridWorld.getSize().x - enemySize.x + 1));
        const y = -enemySize.y;

        enemy.setPosition(new Vector(x, y));

        //this.instantiate(enemy)
        this.gridWorld.addObject(enemy);
        enemy.init();
    }

    private createEnemy(): Enemy {
        const random = Math.floor(Math.random() * 2);

        switch (random) {
            case 0:
                return new UFO(this.gridWorld, new Vector(0, 0));
            case 1:
                return new Rock(this.gridWorld, new Vector(0, 0));
        }
    }
}