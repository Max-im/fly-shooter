import { Background } from './Background';
import { Control } from './Control';
import { Angler1 } from './Enemies/Angler1';
import { Angler2 } from './Enemies/Angler2';
import { Drone } from './Enemies/Drone';
import { Enemy } from './Enemies/Enemy';
import { Lucky } from './Enemies/Lucky';
import { Player } from './Player';
import { Particle } from './Particle';
import { IDrawable } from './types/Drawable';
import { UI } from './UI';
import { IRect } from './types/Rect';

export class Game implements IDrawable {
  width = 1024;
  height = 500;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  score = 0;
  keys: string[] = [];
  enemies: Enemy[] = [];
  particles: Particle[] = [];
  player: Player;
  control: Control;
  ui: UI;
  background: Background;
  debug = false;

  gameTime = 60000; // 1 min
  speed = 1;

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
    this.background = new Background(this);
  }

  update(deltaTime: number) {
    if (!this.gameOver) this.gameTime -= deltaTime;
    if (this.gameTime < 0) this.gameOver = true;
    this.ctx.fillStyle = '#4d79bc';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.background.update();
    this.player.update(deltaTime);

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollistions(this.player, enemy)) {
        enemy.kill();
        if (enemy.type === 'lucky') this.player.onTurbo();
        if (!this.gameOver) this.score -= enemy.score;
        if (this.score < 0) this.gameOver = true;
      }
      this.player.bullets.forEach((bullet) => {
        if (this.checkCollistions(bullet, enemy)) {
          enemy.lives--;
          enemy.takeHit();
          if (enemy.lives <= 0) {
            enemy.kill();
            if (!this.gameOver) this.score += enemy.score;
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

    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter((particle) => !particle.markedForDelete);
    this.background.postUpdate();
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.particles.forEach((particle) => particle.draw());
    this.ui.draw();
    this.background.postDraw();
  }

  private addEnemy() {
    const enemiesMap = [Lucky, Angler1, Angler2, Drone];
    const randomIndex = Math.floor(Math.random() * (enemiesMap.length - 1));
    const RandomEnemy = enemiesMap[randomIndex];
    this.enemies.push(new RandomEnemy(this));
  }

  private checkCollistions(rect1: IRect, rect2: IRect): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}
