import { Game } from "components/Game";
import { Enemy } from "./Enemy";

export class Angler1 extends Enemy {
    y: number;
    width: number;
    height: number;

    constructor(game: Game) {
        super(game);
        this.width = 228 * 0.2;
        this.height = 169 * 0.2;
        this.y = Math.random() * (game.height * 0.9 - this.height);
    }
}