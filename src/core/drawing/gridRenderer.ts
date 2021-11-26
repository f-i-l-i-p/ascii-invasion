import GridWorld from "../gridWorld"
import Color from "./texture/color";

export default class GridRenderer {
    private world: GridWorld;
    private context: CanvasRenderingContext2D;

    protected readonly FONT: string;
    protected readonly FONT_RATIO = 1.7;

    private colorTable = {
        [Color.Black]: "#0C0C0C",
        [Color.Blue]: "#3B78FF",
        [Color.DarkBlue]: "#0037DA",
        [Color.Cyan]: "#61D6D6",
        [Color.DarkCyan]: "#3A96DD",
        [Color.Gray]: "#CCCCCC",
        [Color.DarkGray]: "#767676",
        [Color.Green]: "#16C60C",
        [Color.DarkGreen]: "#13A10E",
        [Color.Purple]: "#B4009E",
        [Color.DarkPurple]: "#881798",
        [Color.Red]: "#E74856",
        [Color.DarkRed]: "#C50F1F",
        [Color.White]: "#F2F2F2",
        [Color.Yellow]: "#F9F1A5",
        [Color.DarkYellow]: "#C19C00",
    };


    constructor(world: GridWorld, context: CanvasRenderingContext2D) {
        this.world = world;
        this.context = context;
    }

    public render(): void {
        const grid = this.world.viewGrid();

        if (grid.length <= 0)
            return;

        const gridWidth = grid[0].length;
        const gridHeight = grid.length;

        let currentColor: Color = Color.Black;
        let content: string = "";

        for (let y = 0; y < gridHeight; y++) {

            content += '<pre style="color: ' + this.colorTable[currentColor] + '; display: inline">';

            for (let x = 0; x < gridWidth; x++) {
                const color = grid[y][x].color;
                const char = grid[y][x].char;

                if (color === currentColor || char === ' ') {
                    content += char;
                } else {
                    content += "</pre>";

                    currentColor = color;
                    content += '<pre style="color: ' + this.colorTable[grid[y][x].color] + '; display: inline">';

                    content += char;
                }
            }

            content += "</pre>\n";
        }

        document.getElementById("content").innerHTML = "<pre>" + content + "</pre>";
    }
}



