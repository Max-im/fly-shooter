import { Game } from "components/Game";
import { Enemy } from "./Enemy";

export class Drone extends Enemy {
    y: number;
    width = 115;
    height = 95;
    score = 3;
    lives = 3;
    image = <HTMLImageElement>document.getElementById('drone');
    frameY = Math.floor(Math.random() * 2);
    maxFrame = 39;
    type = 'drone';

    constructor(game: Game) {
        super(game);
        this.y = Math.random() * (game.height * 0.9 - this.height);
    }
}
