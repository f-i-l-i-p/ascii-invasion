import TickListener from "../core/listeners/tickListener";
import Vector from "../core/vector";
import GameObject from "../engine/gameObject";
import Enemy from "./enemies/enemy";
import Rock from "./enemies/rock";
import UFO from "./enemies/ufo";

export default class EnemySpawner extends GameObject implements TickListener {
    private readonly START_DELAY = 30;
    private readonly LINEAR_DELAY_DECREASE = 0.0005;

    private readonly GET_ROCK_PROB = (tick: number) => { return 1 }
    private readonly GET_UFO_PROB = (tick: number) => { return Math.max(0, Math.log10(tick * 0.03 - 5) * 0.5 || 0) }

    private tickCounter = 0;
    private nextSpawn = 0;

    private spawnPositions: boolean[] = [];
    private spawnSpacing: number;

    public init() {
        this.gridWorld.addPTickListener(this);
        for (let i = 0; i < this.gridWorld.getSize().x; i++) {
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
        const rockProb = this.GET_ROCK_PROB(this.tickCounter);
        const ufoProb = this.GET_UFO_PROB(this.tickCounter);

        console.log(ufoProb)

        const random = Math.random() * (rockProb + ufoProb)

        if (random < rockProb) {
            return new Rock(this.gridWorld, new Vector(0, 0));
        }
        else if (random < rockProb + ufoProb) {
            return new UFO(this.gridWorld, new Vector(0, 0));
        }
    }

    private updateNextSpawn(): void {
        this.nextSpawn = this.tickCounter + this.START_DELAY - this.tickCounter * this.LINEAR_DELAY_DECREASE;
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