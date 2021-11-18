import GameObject from "../core/gameObject";
import IPTickListener from "../core/listeners/pTickListener";
import Vector from "../core/vector";
import UFO from "./ufo";

export default class EnemySpawner extends GameObject implements IPTickListener {
    public static readonly SPAWN_DELAY = 5;

    private tickCounter = 0;

    public init() {
        this.gridWorld.addPTickListener(this);
        console.log("init");
    }

    public pTick(): void {
        if (this.tickCounter >= EnemySpawner.SPAWN_DELAY) {
            this.spawnEnemy();
            this.tickCounter = 0;
        }

        this.tickCounter++;
    }

    private spawnEnemy() {
        const enemy = new UFO(this.gridWorld, new Vector(0, 0));
        const enemySize = enemy.getSize();

        const x = Math.floor(Math.random() * (this.gridWorld.getSize().x - enemySize.x + 1));
        const y = -enemySize.y;

        enemy.setPosition(new Vector(x, y));

        //this.instantiate(enemy)
        this.gridWorld.addObject(enemy);
        enemy.init();
    }
}