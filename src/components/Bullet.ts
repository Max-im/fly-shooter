import { Game } from "./Game";

export class Bullet {
    game: Game;
    x: number;
    y: number;
    width = 10;
    height = 3;
    speed = 3;
    markForDelete = false;

    constructor(game: Game, x: number, y: number) {
        this.game = game;
        this.x = x;
        this.y = y;
    }

    update() {
        this.x += this.speed;

        if (this.width > this.game.width * 0.8) this.markForDelete = true; 
    }

    draw() {
        this.game.ctx.fillStyle = 'yellow';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}