import Color from "../../core/drawing/texture/color";
import Pixel from "../../core/drawing/texture/pixel";
import Texture from "../../core/drawing/texture/texture";
import GridWorld from "../../core/gridWorld";
import TickListener from "../../core/listeners/tickListener";
import Vector from "../../core/vector";
import Entity from "../entity";

export default abstract class ParticleCloud extends Entity implements TickListener {
    texture = new Texture([]);

    protected particleCount = 100;
    protected repeat = false;

    private particles = new Array<Particle>();

    private static readonly SIZE = 35;
    private static readonly DENSITY_CHAR_MAP = {
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

    constructor(world: GridWorld, position: Vector) {
        super(world, position);
        this.updateTexture();
    }

    public init() {
        super.init();
        this.gridWorld.addPTickListener(this);
        this.createParticles();
    }

    public getSize(): Vector {
        return new Vector(ParticleCloud.SIZE, ParticleCloud.SIZE);
    }

    public tick(): void {
        this.updateParticles();
        this.updateTexture();
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

    private densityToPixel(density: ParticlePixel): Pixel {
        const MAX_DENSITY = 9;
        density.count = Math.min(density.count, MAX_DENSITY);

        let char = ParticleCloud.DENSITY_CHAR_MAP[density.count];

        return {
            char: char,
            color: density.color,
        }
    }

    private getDensityMap(): ParticlePixel[][] {
        let density: ParticlePixel[][] = [];

        for (let i = 0; i < ParticleCloud.SIZE; i++) {
            let row: ParticlePixel[] = []
            for (let j = 0; j < ParticleCloud.SIZE; j++) {
                row.push({count: 0, color: Color.Black});
            }
            density.push(row);
        }

        this.particles.forEach(particle => {
            const x = Math.round(particle.position.x);
            const y = Math.round(particle.position.y);
            if (particle.life > 0 && x >= 0 && y >= 0 && x < ParticleCloud.SIZE && y < ParticleCloud.SIZE) {
                density[y][x].count++;
                density[y][x].color = particle.color;
            }
        });

        return density;
    }

    private updateParticles() {
        let allDead = true;

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            particle.position.add(particle.velocity);
            particle.velocity.multiply(particle.multiplier);
            particle.life--;

            if (particle.life > 0) {
                allDead = false;
            } else if (this.repeat) {
                this.particles[i] = this.createParticle();
            }
        }

        if (allDead && !this.repeat) {
            this.scene.removeObject(this)
        }
    }

    protected createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    protected abstract createParticle(): Particle;
}

export interface Particle {
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