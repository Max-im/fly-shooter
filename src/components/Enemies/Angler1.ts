import { Game } from "components/Game";
import { Enemy } from "./Enemy";

export class Angler1 extends Enemy {
    y: number;
    width: number;
    height: number;
    score: number;
    lives: number;
    image: HTMLImageElement;
    frameY = Math.floor(Math.random() * 3);
    maxFrame = 37;

    constructor(game: Game) {
        super(game);
        this.width = 228;
        this.height = 169;
        this.lives = 5;
        this.score = 5;
        this.y = Math.random() * (game.height * 0.9 - this.height);
        this.image = <HTMLImageElement>document.getElementById('angler1');
    }
}
