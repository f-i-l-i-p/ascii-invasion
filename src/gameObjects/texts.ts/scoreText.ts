import IDrawable from "../../core/drawing/drawable";
import GridWorld from "../../core/gridWorld";
import Vector from "../../core/vector";
import GameText from "./gameText";

export default class ScoreText extends GameText implements IDrawable {
    constructor(world: GridWorld) {
        super(world, new Vector(0, 0));
        this.setScore(0);
    }

    public setScore(score: number) {
        this.setText("Score: " + score);
    }
}