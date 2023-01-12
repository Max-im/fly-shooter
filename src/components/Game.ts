import { Control } from './Control';
import { Angler1 } from './Enemies/Angler1';
import { Enemy } from './Enemies/Enemy';
import { Player } from './Player';
import { IDrawable } from './types/Drawable';
import { UI } from './UI';

export class Game implements IDrawable {
  width = 1024;
  height = 567;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  score = 0;
  keys: string[] = [];
  enemies: Enemy[] = [];
  player: Player;
  control: Control;
  ui: UI;

  ammo = 20;
  maxAmmo = 50;
  ammoTimer = 0;
  ammoInterval = 500;

  enemyInterval = 1000;
  enemyTimer = 0;

  winningScore = 20;
  gameOver = false;

  constructor() {
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
    
    this.enemies.forEach((enemy) => {
        enemy.update();
        if (this.checkCollistions(this.player, enemy)) {
            enemy.markedForDelete = true;
        }
        this.player.bullets.forEach(bullet => {
            if(this.checkCollistions(bullet, enemy)) {
                enemy.lives--;
                if (enemy.lives <= 0) {
                    enemy.markedForDelete = true;
                    this.score += enemy.score;
                    if (this.winningScore < this.score) this.gameOver = true;
                }
                bullet.markForDelete = true;
            }
        });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDelete);
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  draw() {
    this.player.draw();
    this.ui.draw();
    this.enemies.forEach((enemy) => enemy.draw());
  }

  private addEnemy() {
    this.enemies.push(new Angler1(this));
    console.log(this.enemies);
  }

  private checkCollistions(rect1: any, rect2: any): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}
