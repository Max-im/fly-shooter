import { Game } from "./Game";
import { Bullet } from "./Bullet";
import { IDrawable } from "./types/Drawable";
import { IUpdatable } from "./types/Updatable";
import { Sprite } from "./Sprite";

export class Player extends Sprite implements IDrawable, IUpdatable{
    game: Game;
    width = 120;
    height = 190;
    x = 20;
    y = 100;
    frameX = 0;
    frameY = 0;
    maxFrame = 37;
    speedY = 0;
    maxSpeed = 3;
    bullets: Bullet[] = [];
    image: HTMLImageElement

    constructor(game: Game) {
        super();
        this.game = game;
        this.image = <HTMLImageElement>document.getElementById('player');
    } 

    update() {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;
        this.y += this.speedY;
        this.bullets.forEach(bullet => bullet.update());
        this.bullets = this.bullets.filter(bullet => !bullet.markForDelete);
        this.updateSprite();
    }

    draw() {
        this.drawSprite();
        this.bullets.forEach(bullet => bullet.draw());
    }

    shoot() {
        if (this.game.ammo > 0) {
            this.bullets.push(new Bullet(this.game, this.x + 100, this.y + 33));
            this.game.ammo--;
        }
    }
}