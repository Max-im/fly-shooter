import { Game } from "components/Game";
import { Explosion } from "./Explosion";

export class SmokeExplosion extends Explosion {
    image = <HTMLImageElement>document.getElementById('smoke');
    maxFrame = 8;
    width = 200;
    height = 200;
    x: number;
    y: number;

    constructor(game: Game, x: number, y: number) {
        super(game);
        this.x = x;
        this.y = y;
    }
}