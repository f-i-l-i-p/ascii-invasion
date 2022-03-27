import Texture from "../components/texture";
import Scene from "../engine/scene";
import Vector from "../core/vector";
import Color from "./texture/color";
import Pixel, { emptyPixel } from "./texture/pixel";

export default class SceneRenderer {
    private scene: Scene
    private context: CanvasRenderingContext2D

    private readonly FONT = "ascii-invasion-font"
    /** How tall the font is relative to its width. */
    private readonly FONT_RATIO = 1.9

    private readonly BACKGROUND_COLOR = "#222"

    private readonly COLOR_TABLE = {
        [Color.Black]: "#0C0C0C",
        [Color.Blue]: "#3B78FF",
        [Color.Cyan]: "#61D6D6",
        [Color.Gray]: "#CCCCCC",
        [Color.Green]: "#16C60C",
        [Color.Purple]: "#B4009E",
        [Color.Red]: "#E74856",
        [Color.White]: "#F2F2F2",
        [Color.Yellow]: "#F9F1A5",
        [Color.DarkBlue]: "#0037DA",
        [Color.DarkCyan]: "#3A96DD",
        [Color.DarkGray]: "#767676",
        [Color.DarkGreen]: "#13A10E",
        [Color.DarkPurple]: "#881798",
        [Color.DarkRed]: "#C50F1F",
        [Color.DarkYellow]: "#C19C00",
    };

    constructor(scene: Scene, context: CanvasRenderingContext2D) {
        this.scene = scene
        this.context = context
    }

    /**
     * Updates the canvas size to fill the window.
     */
    private updateCanvasSize(sceneSize: Vector): void {
        // Canvas size without scaling
        const width = sceneSize.x
        const height = sceneSize.y * this.FONT_RATIO

        // Calculate max canvas scaling factor
        const scaling_factor = Math.min(window.innerWidth / width, window.innerHeight / height)

        this.context.canvas.width = width * scaling_factor
        this.context.canvas.height = height * scaling_factor
    }

    /**
     * Generates a grid of Pixels from the scene.
     */
    private generateGrid(sceneSize: Vector): Pixel[][] {
        let grid: Pixel[][] = Array(sceneSize.y)

        let textures = this.scene.componentManager.getComponents(Texture)

        // Fill with empty pixels
        for (let y = 0; y < sceneSize.y; y++) {
            grid[y] = Array(sceneSize.x)
            for (let x = 0; x < sceneSize.x; x++) {
                grid[y][x] = emptyPixel;
            }
        }

        // Add textures
        for (let i = 0; i < textures.length; i++) {
            const texture = textures[i];
            let size = texture.getSize();
            let position = texture.position.get();

            for (let y = 0; y < size.y; y++) {
                for (let x = 0; x < size.x; x++) {
                    // If outside grid
                    if (position.y + y < 0 || position.y + y >= sceneSize.y || position.x + x < 0 || position.x + x >= sceneSize.x) {
                        continue;
                    }

                    const pixel = texture.viewPixel(x, y);
                    if (pixel.char === ' ' || pixel.char === '') {
                        continue;
                    }

                    if (pixel.color === undefined) {
                        throw new Error("Color is undefined")
                    }

                    grid[position.y + y][position.x + x] = pixel;
                }
            }
        }

        return grid
    }

    /**
     * Redraws the content of the scene to the canvas.
     */
    public render(): void {
        const sceneSize = this.scene.getSize()
        this.updateCanvasSize(sceneSize)

        const grid = this.generateGrid(sceneSize)
        if (grid.length <= 0)
            return;

        const charWidth = this.context.canvas.width / sceneSize.x
        const charHeight = this.context.canvas.height / sceneSize.y

        // Fill background
        this.context.fillStyle = this.BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        // Draw world
        this.context.font = `${charHeight}px ${this.FONT}`;
        for (let y = 0; y < sceneSize.y; y++) {
            for (let x = 0; x < sceneSize.x; x++) {
                const pixel = grid[y][x]

                if (pixel.char === ' ') {
                    continue;
                }

                const color = this.COLOR_TABLE[pixel.color];
                this.context.fillStyle = color;

                this.context.fillText(pixel.char, x * charWidth, (y + 1) * charHeight);
            }
        }
    }
}

