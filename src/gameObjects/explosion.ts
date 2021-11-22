import Vector from "../core/vector";
import Color from "../core/drawing/texture/color";
import ParticleCloud, { Particle } from "./particleCloud";
import GridWorld from "../core/gridWorld";

export default class Explosion extends ParticleCloud {
    private colors = [Color.Red, Color.DarkRed, Color.Yellow, Color.DarkYellow];
    private readonly falling: boolean;
    private readonly particleMaxLife: number;

    private static readonly PARTICLE_MULTIPLIER = 0.8;
    private static readonly PARTICLE_MAX_VELOCITY = 3;

    constructor(world: GridWorld, position: Vector, colors: Color[], falling: boolean, size: number) {
        super(world, position);
        this.colors = this.colors.concat(colors);
        this.falling = falling;
        this.particleMaxLife = size;
        this.particleCount = size;
    }

    public static explodeAt(world: GridWorld, position: Vector, colors: Color[], falling: boolean, size: number): void {
        const exp = new Explosion(world, position, colors, falling, size);
        const expSize = exp.getSize();

        const x = Math.floor(position.x - expSize.x / 2);
        const y = Math.floor(position.y - expSize.y / 2);

        exp.setPosition(new Vector(x, y));

        world.addObject(exp);
        exp.init();
    }

    public init() {
        if (this.falling) {
            this.gridWorld.addFalling(this);
        }
        super.init();
    }

    protected createParticle(): Particle {
        return {
            position: new Vector(Math.floor(this.getSize().x / 2), Math.floor(this.getSize().y / 2)),
            velocity: this.randomVelocity(),
            multiplier: Explosion.PARTICLE_MULTIPLIER,
            life: Math.floor(Math.random() * this.particleMaxLife),
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
        };
    }

    private randomVelocity(): Vector {
        const FONT_RATIO = 1.7;
        const defaultVelocity = Math.random() * Explosion.PARTICLE_MAX_VELOCITY;
        const direction = Math.random() * 2 * Math.PI;
        return new Vector(Math.cos(direction) * defaultVelocity, Math.sin(direction) * defaultVelocity / FONT_RATIO )
    }

    public destroy() {
        if (this.falling) {
            this.gridWorld.removeFalling(this);
        }
        super.destroy();
    }
}