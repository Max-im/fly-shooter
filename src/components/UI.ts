import { Game } from "./Game";
import { IDrawable } from "./types/Drawable";

export class UI implements IDrawable {
    game: Game;
    fontSize = 25;
    fontFamily = 'Helvetica';
    color = 'yellow';

    constructor(game: Game) {
        this.game = game;
    }

    draw() {
        const ctx = this.game.ctx;
        ctx.save();
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.fillStyle = 'white';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'black';
        ctx.fillText('Score: ' + this.game.score, 20, 40);

        ctx.fillStyle = this.color;
        for(let i = 0; i < this.game.ammo; i++) {
            ctx.fillRect(20 + 5 * i, 50, 3, 20);
        }
        ctx.restore();
    }
}