import Vector from "../core/vector";
import Color from "../core/drawing/texture/color";
import ParticleCloud, { Particle } from "./particleCloud";

export default class RocketThrust extends ParticleCloud {
    protected particleCount = 10;
    protected repeat = true;

    private static readonly PARTICLE_COLORS = [Color.Red, Color.DarkRed, Color.Yellow, Color.DarkYellow]
    private static readonly PARTICLE_MAX_LIFE = 5;
    private static readonly PARTICLE_MULTIPLIER = 1;
    private static readonly PARTICLE_VELOCITY = 0.5;

    protected createParticle(): Particle {
        return {
            position: this.randomPosition(),
            velocity: this.getVelocity(),
            multiplier: RocketThrust.PARTICLE_MULTIPLIER,
            life: this.getLife(),
            color: RocketThrust.PARTICLE_COLORS[Math.floor(Math.random() * RocketThrust.PARTICLE_COLORS.length)],
        };
    }

    private randomPosition(): Vector {
        const offset = Math.pow((Math.random() - 0.5), 3) * 8;

        const y = 0;
        const x = Math.floor(this.getSize().x / 2) + offset;

        return new Vector(x, y);
    }

    private getVelocity(): Vector {
        return new Vector(0, RocketThrust.PARTICLE_VELOCITY)
    }

    private getLife(): number {
        return Math.floor(Math.random() * RocketThrust.PARTICLE_MAX_LIFE);
    }
}