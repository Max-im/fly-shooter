import { Control } from "./Control";
import { Player } from "./Player";

export class Game {
    width = 1024;
    height = 567;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player: Player;
    keys: string[] = [];
    control: Control;

    constructor () {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.player = new Player(this);
        this.control = new Control(this);
    }

    update() {
        this.ctx.fillStyle = '#4d79bc';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.player.update();
    }

    draw() {
        this.player.draw();
    }


}