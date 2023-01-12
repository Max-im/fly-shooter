import { Control } from "./Control";
import { Player } from "./Player";
import { UI } from "./UI";

export class Game {
    width = 1024;
    height = 567;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    keys: string[] = [];
    player: Player;
    control: Control;
    ui: UI;
    ammo = 20;
    maxAmmo = 50;
    ammoTimer = 0;
    ammoInterval = 500;

    constructor () {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.player = new Player(this);
        this.control = new Control(this);
        this.ui = new UI(this);
    }

    update(deltaTime: number) {
        this.ctx.fillStyle = '#4d79bc';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.player.update();
        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++; 
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }
    }

    draw() {
        this.player.draw();
        this.ui.draw();
    }


}