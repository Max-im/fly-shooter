import { Game } from "components/Game";
import { Enemy } from "./Enemy";

export class Angler2 extends Enemy {
    y: number;
    width = 213;
    height = 165;
    score = 3;
    lives = 3;
    image = <HTMLImageElement>document.getElementById('angler2');
    frameY = Math.floor(Math.random() * 2);
    maxFrame = 37;
    type = 'angler2';


    constructor(game: Game) {
        super(game);
        this.y = Math.random() * (game.height * 0.95 - this.height);
    }
}
