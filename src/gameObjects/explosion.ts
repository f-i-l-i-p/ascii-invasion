import Vector from "../core/vector";
import Color from "../core/drawing/texture/color";
import ParticleCloud, { Particle } from "./particleCloud";

export default class Explosion extends ParticleCloud {
    protected particleCount = 100;

    private static readonly PARTICLE_COLORS = [Color.Red, Color.DarkRed, Color.Yellow, Color.DarkYellow]
    private static readonly PARTICLE_MAX_LIFE = 20;
    private static readonly PARTICLE_MULTIPLIER = 0.7;
    private static readonly PARTICLE_MAX_VELOCITY = 2;

    protected createParticle(): Particle {
        return {
            position: new Vector(Math.floor(this.getSize().x / 2), Math.floor(this.getSize().y / 2)),
            velocity: this.randomVelocity(),
            multiplier: Explosion.PARTICLE_MULTIPLIER,
            life: Math.floor(Math.random() * Explosion.PARTICLE_MAX_LIFE),
            color: Explosion.PARTICLE_COLORS[Math.floor(Math.random() * Explosion.PARTICLE_COLORS.length)],
        };
    }

    private randomVelocity(): Vector {
        const defaultVelocity = Math.random() * Explosion.PARTICLE_MAX_VELOCITY;
        const direction = Math.random() * 2 * Math.PI;
        return new Vector(Math.cos(direction) * defaultVelocity, Math.sin(direction) * defaultVelocity)
    }
}