import { Game } from "components/Game";
import { Enemy } from "./Enemy";

export class Angler1 extends Enemy {
    y: number;
    width: number;
    height: number;
    score: number;
    lives: number;

    constructor(game: Game) {
        super(game);
        this.width = 228 * 0.2;
        this.height = 169 * 0.2;
        this.lives = 1;
        this.score = 100;
        this.y = Math.random() * (game.height * 0.9 - this.height);
    }
}
