import { Game } from "./Game";

export abstract class Sprite {
    abstract image: HTMLImageElement;
    abstract frameX: number;
    abstract frameY: number;
    abstract maxFrame: number;
    abstract game: Game;
    abstract x: number;
    abstract y: number;
    abstract width: number;
    abstract height: number;

    updateSprite() {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
    }

    draw() {
        this.game.ctx.drawImage(
            this.image, 
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x, 
            this.y, 
            this.width, 
            this.height
        );
        if (this.game.debug) {
            this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
            if ('lives' in this) {
                this.game.ctx.fillStyle = 'black';
                this.game.ctx.font = '20px Helvetica';
                // @ts-ignore
                this.game.ctx.fillText(this.lives.toString(), this.x, this.y);
            }
        }
    }
}
