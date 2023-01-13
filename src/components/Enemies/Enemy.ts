import { IDrawable } from "components/types/Drawable";
import { IUpdatable } from "components/types/Updatable";
import { Game } from "../Game";
import { Sprite } from "../Sprite";
import { Particle } from "../Particle";
import { SmokeExplosion } from "../Explosion/SmokeExplosion";
import { FireExplosion } from "../Explosion/FIreExplosion";

export abstract class Enemy extends Sprite implements IDrawable, IUpdatable {
    game: Game;
    markedForDelete = false;
    speedX: number;
    x: number;
    frameX = 0;

    abstract maxFrame: number;
    abstract frameY: number;
    abstract score: number;
    abstract lives: number;
    abstract y: number;
    abstract width: number;
    abstract height: number;
    abstract image: HTMLImageElement;
    abstract type: string;
    
    constructor(game: Game) {
        super();
        this.game = game;
        this.x = game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
    }

    update() {
        this.x += this.speedX - this.game.speed;
        if (this.x + this.width < 0) this.markedForDelete = true;
        this.updateSprite();
    }

    takeHit() {
        this.game.particles.push(new Particle(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5));
    }
    
    kill() {
        this.markedForDelete = true;
        // @ts-ignore
        const explosions = [FireExplosion, SmokeExplosion];
        const index = Math.floor(Math.random() * explosions.length);
        const RandomExplosion = explosions[index];
        this.game.explosions.push((new RandomExplosion(this.game, this.x, this.y)));
        for (let i = 0; i < this.score; i++) {
            this.game.particles.push(new Particle(this.game, this.x + this.width * 0.5, this.y + this.height * 0.5))
        }
    }

    touch() {
        if (!this.game.gameOver) this.game.score -= this.score; 
        this.kill();
    }
}