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

        ctx.fillStyle = 'white';
        const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
        ctx.fillText('Timer: ' + formattedTime, 20, 100);

        if (this.game.gameOver) {
            ctx.textAlign = 'center';
            let title = 'You Lost!';
            let subtitle = 'Try Again Next Time!';
            
            if (this.game.winningScore < this.game.score) {
                title = 'You Win!'
                subtitle = 'Well Done!'
            }

            ctx.fillStyle = 'white';
            ctx.font = '50px ' + this.fontFamily;
            ctx.fillText(title, this.game.width * 0.5, this.game.height * 0.5 - 20);
            ctx.font = '25px ' + this.fontFamily;
            ctx.fillText(subtitle, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
        ctx.restore();
    }
}