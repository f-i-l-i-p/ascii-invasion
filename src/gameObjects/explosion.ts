import Texture from "../core/drawing/texture/texture";
import TickListener from "../core/listeners/tickListener";
import Entity from "./entity";
import Vector from "../core/vector";
import Pixel from "../core/drawing/texture/pixel";
import Color from "../core/drawing/texture/color";

export default class Explosion extends Entity implements TickListener {
    texture = new Texture([]);

    private static readonly PARTICLE_COUNT = 100;
    private particles = new Set<Particle>();
    private static readonly SIZE = 101;

    public init() {
        super.init();
        this.gridWorld.addPTickListener(this);
        this.createParticles();
    }

    public getSize(): Vector {
        return new Vector(Explosion.SIZE, Explosion.SIZE);
    }

    public tick(): void {
        this.updateParticles();
        this.updateTexture();
    }

    public destroy() {
        this.gridWorld.removePTickListener(this);
        super.destroy();
    }

    private updateTexture() {
        const density = this.getDensityMap();

        const pixelData = density.map((densityRow) => {
            return densityRow.map(density => {
                return this.densityToPixel(density);
            });
        });

        this.texture.setPixels(pixelData);
    }

    private densityCharMap = {
        0: ' ',
        1: '-',
        2: '+',
        3: 's',
        4: '?',
        5: '&',
        6: '$',
        7: '#',
        8: 'W',
        9: '@',
    }

    private densityToPixel(density: ParticlePixel): Pixel {
        const MAX_DENSITY = 9;
        density.count = Math.min(density.count, MAX_DENSITY);

        let char = this.densityCharMap[density.count];

        return {
            char: char,
            color: density.color,
        }
    }

    private getDensityMap(): ParticlePixel[][] {
        let density: ParticlePixel[][] = [];

        for (let i = 0; i < Explosion.SIZE; i++) {
            let row: ParticlePixel[] = []
            for (let j = 0; j < Explosion.SIZE; j++) {
                row.push({count: 0, color: Color.Black});
            }
            density.push(row);
        }

        this.particles.forEach(particle => {
            const x = Math.round(particle.position.x);
            const y = Math.round(particle.position.y);
            if (particle.life > 0 && x >= 0 && y >= 0 && x < Explosion.SIZE && y < Explosion.SIZE) {
                density[y][x].count++;
                density[y][x].color = particle.color;
            }
        });

        return density;
    }

    private updateParticles() {
        let allDead = true;
        this.particles.forEach(particle => {
            particle.position.add(particle.velocity)
            particle.velocity.multiply(particle.multiplier);
            particle.life--;

            if (particle.life > 0) {
                allDead = false;
            }
        });

        if (allDead) {
            this.destroy();
        }
    }

    private createParticles() {
        for (let i = 0; i < Explosion.PARTICLE_COUNT; i++) {
            this.createParticle();
        }
    }

    private createParticle() {
        const MAX_LIFE = 20;
        const COLORS = [Color.Red, Color.DarkRed, Color.Yellow, Color.DarkYellow]

        this.particles.add({
            position: new Vector(Math.floor(Explosion.SIZE / 2), Math.floor(Explosion.SIZE / 2)),
            velocity: this.randomVelocity(),
            multiplier: 0.7,
            life: Math.floor(Math.random() * MAX_LIFE),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
    }

    private randomVelocity(): Vector {
        const defaultVelocity = Math.random() * 2;
        const direction = Math.random() * 2 * Math.PI;
        return new Vector(Math.cos(direction) * defaultVelocity, Math.sin(direction) * defaultVelocity)
    }
}

interface Particle {
    position: Vector,
    velocity: Vector,
    multiplier: number,
    life: number,
    color: Color,
}

interface ParticlePixel {
    count: number,
    color: Color,
}