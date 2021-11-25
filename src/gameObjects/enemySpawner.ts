import GameObject from "../core/gameObject";
import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import Enemy from "./enemies/enemy";
import Rock from "./enemies/rock";
import UFO from "./enemies/ufo";

export default class EnemySpawner extends GameObject implements TickListener {

    private tickCounter = 0;
    private nextSpawn = 0;

    private spawnPositions: boolean[] = [];
    private spawnSpacing: number;

    public init() {
        this.gridWorld.addPTickListener(this);
        for (let i = 0; i< this.gridWorld.getSize().x; i++) {
            this.spawnPositions.push(true);
        }

        this.spawnSpacing = this.gridWorld.getSize().x / 5;
    }

    public tick(): void {
        if (this.tickCounter >= this.nextSpawn) {
            this.spawnEnemy();
            this.updateNextSpawn();
        }

        this.tickCounter++;
    }

    private spawnEnemy() {
        const enemy = this.createEnemy();
        const enemySize = enemy.getSize();

        const positions = this.getPossibleSpawnPositions(enemySize.x);

        const x = positions[Math.floor(Math.random() * positions.length)];
        const y = -enemySize.y;

        this.updateSpawnPositions(x + Math.floor(enemySize.x / 2));

        enemy.setPosition(new Vector(x, y));
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

    private updateNextSpawn(): void {
        const START_DELAY = 50;
        const LINEAR_DECREASE = 0.002;

        this.nextSpawn = this.tickCounter + START_DELAY - this.tickCounter * LINEAR_DECREASE;
    }

    private updateSpawnPositions(latestSpawnCenter: number) {
        const start = latestSpawnCenter - Math.floor(this.spawnSpacing / 2);
        const end = latestSpawnCenter + Math.floor(this.spawnSpacing / 2);

        for (let i = 0; i < this.spawnPositions.length; i++) {
            if (i >= start && i <= end) {
                this.spawnPositions[i] = false;
            }
            else if (!this.spawnPositions[i]) {
                this.spawnPositions[i] = true;
            }
        }
    }

    private getPossibleSpawnPositions(width: number): number[] {
        let possiblePositions: number[] = [];

        let streak = 0;
        for (let i = 0; i < this.spawnPositions.length; i++) {
            if (this.spawnPositions[i]) {
                streak++;
            } else {
                streak = 0;
            }

            if (streak >= width) {
                possiblePositions.push(i - width + 1)
            }
        }

        return possiblePositions;
    }
}