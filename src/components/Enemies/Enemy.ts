import { IDrawable } from "components/types/Drawable";
import { IUpdatable } from "components/types/Updatable";
import { Game } from "../Game";

export abstract class Enemy implements IDrawable, IUpdatable {
    game: Game;
    markedForDelete = false;
    speedX: number;
    x: number;

    abstract score: number;
    abstract lives: number;
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
        // this.game.ctx.fillStyle = 'black';
        // this.game.ctx.font = '20px Helvetica';
        // this.game.ctx.fillText(this.lives, this.x, this.y);
        
    }
}