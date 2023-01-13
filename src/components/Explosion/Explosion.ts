import { Game } from "components/Game";
import { Sprite } from "../Sprite";

export abstract class Explosion extends Sprite {
    game: Game;
    frameX = 0;
    frameY = 0;
    height = 200;
    timer = 0;
    fps = 30;
    interval = 1000 / this.fps;
    markedForDelete = false;
    
    abstract x: number;
    abstract y: number;
    abstract image: HTMLImageElement;
    abstract maxFrame: number;

    constructor(game: Game) {
        super();
        this.game = game;
    }

    update(deltaTime: number) {
        this.x -= this.game.speed;
        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else this.timer += deltaTime;
        if (this.frameX > this.maxFrame) this.markedForDelete = true
    }
}
