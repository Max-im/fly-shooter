import { Game } from "components/Game";
import { Particle } from "../Particle";
import { Drone } from "./Drone";
import { Enemy } from "./Enemy";

export class HiveWhale extends Enemy {
    y: number;
    width = 400;
    height = 227;
    score = 15;
    lives = 15;
    image = <HTMLImageElement>document.getElementById('hivewhale');
    frameY = 0;
    maxFrame = 37;
    type = 'hive';
    speedX = Math.random() * -1.2 - 0.2;

    constructor(game: Game) {
        super(game);
        this.y = Math.random() * (game.height * 0.95 - this.height);
    }

    kill() {
        this.markedForDelete = true;
        for (let i = 0; i < this.score; i++) {
            this.game.particles.push(new Particle(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5))
        }
        for (let i = 0; i < 5; i++) {
            const drone = new Drone(this.game, this.x + Math.random() * this.width, this.y + Math.random() * this.height * 0.5);
            this.game.enemies.push(drone);
        }
    }
}
