import { Game } from "./Game";
import { Bullet } from "./Bullet";
import { IDrawable } from "./types/Drawable";
import { IUpdatable } from "./types/Updatable";
import { Sprite } from "./Sprite";

export class Player extends Sprite implements IDrawable {
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
    image = <HTMLImageElement>document.getElementById('player');
    turbo = false;
    turboTimer = 0;
    powerUpLimit = 5000;

    constructor(game: Game) {
        super();
        this.game = game;
    } 

    update(deltaTime: number) {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;
        this.y += this.speedY;

        const bottomBorder = this.game.height - this.height * 0.5;
        const topBorder = -this.height * 0.5;
        if (this.y > bottomBorder) this.y = bottomBorder; 
        else if (this.y < topBorder) this.y = topBorder; 
        
        this.bullets.forEach(bullet => bullet.update());
        this.bullets = this.bullets.filter(bullet => !bullet.markForDelete);
        this.updateSprite();
        if (this.turbo) {
            if (this.turboTimer > this.powerUpLimit) {
                this.turboTimer = 0;
                this.turbo = false;
                this.frameX = 0
            } else {
                this.turboTimer += deltaTime;
                this.frameY = 1;
                this.game.ammo += 0.1;
            }
        }
    }

    draw() {
        this.bullets.forEach(bullet => bullet.draw());
        this.drawSprite();
    }

    shoot() {
        if (this.game.ammo > 0) {
            this.bullets.push(new Bullet(this.game, this.x + 90, this.y + 33));
            this.game.ammo--;
        }
        if (this.turbo) this.bottomShoot();
    }

    private bottomShoot() {
        if (this.game.ammo > 0) {
            this.bullets.push(new Bullet(this.game, this.x + 90, this.y + 175));
            this.game.ammo--;
        }
    }

    onTurbo() {
        this.turbo = true;
        this.turboTimer = 0;
        if(this.game.ammo< this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
    }
}