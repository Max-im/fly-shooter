import { Player } from "./Player";

export class Game {
    width = 1024;
    height = 567;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player: Player;

    constructor () {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.player = new Player(this);
    }

    update() {
        this.player.update();
    }

    draw() {
        this.player.draw();
    }


}