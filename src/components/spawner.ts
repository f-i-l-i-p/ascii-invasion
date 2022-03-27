import Position from "./position";
import Texture from "./texture";
import Vector from "../core/vector";
import GameObject from "../engine/gameObject";
import { createRock } from "../objectFactory";
import Component from "../engine/component";

export default class Spawner extends Component {
    private readonly START_DELAY = 30;
    private readonly LINEAR_DELAY_DECREASE = 0.0005;

    private readonly GET_ROCK_PROB = (tick: number) => { return 1 }
    private readonly GET_UFO_PROB = (tick: number) => { return Math.max(0, Math.log10(tick * 0.03 - 5) * 0.5 || 0) }

    private nextSpawn = 0;

    private spawnPositions: boolean[] = [];
    private spawnSpacing: number;

    public init() {
        for (let i = 0; i < this.gameObject.scene.getSize().x; i++) {
            this.spawnPositions.push(true);
        }

        this.spawnSpacing = this.gameObject.scene.getSize().x / 5;
    }

    public update(frame: number): void {
        if (frame >= this.nextSpawn) {
            this.spawnEnemy(frame);
            this.updateNextSpawn(frame);
        }
    }

    private spawnEnemy(currentFrame: number) {
        const enemy = this.createEnemy(currentFrame);
        this.gameObject.scene.addObject(enemy)

        const enemySize = enemy.getComponent(Texture).getSize()

        const positions = this.getPossibleSpawnPositions(enemySize.x);

        const x = positions[Math.floor(Math.random() * positions.length)];
        const y = -enemySize.y;

        this.updateSpawnPositions(x + Math.floor(enemySize.x / 2));

        enemy.getComponent(Position).set(new Vector(x, y));
    }

    private createEnemy(currentFrame: number): GameObject {
        const rockProb = this.GET_ROCK_PROB(currentFrame);
        const ufoProb = 0 // this.GET_UFO_PROB(this.tickCounter);

        const random = Math.random() * (rockProb + ufoProb)

        if (random < rockProb) {
            return createRock();
        }
        else if (random < rockProb + ufoProb) {
            //return new UFO(this.gridWorld, new Vector(0, 0));
        }
    }

    private updateNextSpawn(currentFrame: number): void {
        this.nextSpawn = currentFrame + this.START_DELAY - currentFrame * this.LINEAR_DELAY_DECREASE;
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