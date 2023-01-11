import { Game } from "./Game";

export class Player {
    game: Game;
    width = 120;
    height = 190;
    x = 20;
    y = 100;
    speedY = 0;

    constructor(game: Game) {
        this.game = game;
    } 

    update() {
        this.y += this.speedY;
    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}