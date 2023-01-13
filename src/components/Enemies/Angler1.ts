import { Game } from "components/Game";
import { Enemy } from "./Enemy";

export class Angler1 extends Enemy {
    y: number;
    width = 228;
    height = 169;
    score = 2;
    lives = 2;
    image = <HTMLImageElement>document.getElementById('angler1');
    frameY = Math.floor(Math.random() * 3);
    maxFrame = 37;
    type = 'angler1';

    constructor(game: Game) {
        super(game);
        this.y = Math.random() * (game.height * 0.95- this.height);
    }
}
