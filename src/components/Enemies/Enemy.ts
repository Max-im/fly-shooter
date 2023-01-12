import { Game } from "../Game";

export abstract class Enemy {
    game: Game;
    markedForDelete = false;
    speedX: number;
    x: number;

    abstract y: number;
    abstract width: number;
    abstract height: number;
    
    constructor(game: Game) {
        this.game = game;
        this.x = game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
    }

    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) this.markedForDelete = true;
    }

    draw() {
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}