import { Game } from "./Game";

export class UI {
    game: Game;
    fontSize = 25;
    fontFamily = 'Helvetica';
    color = 'yellow';

    constructor(game: Game) {
        this.game = game;
    }

    draw() {
        this.game.ctx.fillStyle = this.color;
        for(let i = 0; i < this.game.ammo; i++) {
            this.game.ctx.fillRect(20 + 5 * i, 50, 3, 20);
        }
    }
}