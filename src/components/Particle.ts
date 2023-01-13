import { Game } from './Game';

export class Particle {
  x: number;
  y: number;
  game: Game;
  image = <HTMLImageElement>document.getElementById('gears');
  frameX = Math.floor(Math.random() * 3);
  frameY = Math.floor(Math.random() * 3);
  width = 50;
  height = 50;
  sizeModifier = parseFloat((Math.random() * 0.5 + 0.5).toFixed(1));
  size = this.width * this.sizeModifier;
  speedX = Math.random() * 6 - 3;
  speedY = Math.random() * -15;
  gravity = 0.5;
  markedForDelete = false;
  angle = 0;
  angleVelocity = Math.random() * 0.2 - 0.1;
  bounced = 2;
  bottomBounceBorder = 80 * Math.random() + 60;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  update() {
    this.angle += this.angleVelocity;
    this.speedY += this.gravity;
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.y > this.game.height + this.size || this.x < 0 - this.size)
      this.markedForDelete = true;
    if (this.y > this.game.height - this.bottomBounceBorder && this.bounced > 0) {
      this.bounced--;
      this.speedY *= -0.5;
    }
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.translate(this.x, this.y);
    this.game.ctx.rotate(this.angle);

    this.game.ctx.drawImage(
      this.image,
      this.frameX * this.size,
      this.frameY * this.size,
      this.width,
      this.height,
      this.size * -0.5,
      this.size * -0.5,
      this.width,
      this.height
    );
    this.game.ctx.restore();
  }
}
