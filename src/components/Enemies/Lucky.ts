import { Game } from "components/Game";
import { Enemy } from "./Enemy";

export class Lucky extends Enemy {
    y: number;
    width = 99;
    height = 95;
    score = 0;
    lives = 3;
    image = <HTMLImageElement>document.getElementById('lucky');
    frameY = Math.floor(Math.random() * 2);
    maxFrame = 37;
    type = 'lucky';

    constructor(game: Game) {
        super(game);
        this.y = Math.random() * (game.height * 0.9 - this.height);
    }
}
