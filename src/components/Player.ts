import { Game } from "./Game";

export class Player {
    game: Game;
    width = 120;
    height = 190;
    x = 20;
    y = 100;
    speedY = 0;
    maxSpeed = 3;

    constructor(game: Game) {
        this.game = game;
    } 

    update() {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;
        this.y += this.speedY;
    }

    draw() {
        this.game.ctx.fillStyle = 'black';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}