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
    speedX = Math.random() * -4.2 - 0.5;

    constructor(game: Game, x: number, y: number) {
        super(game);
        this.x = x;
        this.y = y;
    }
}
