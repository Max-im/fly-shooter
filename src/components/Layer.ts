import { Game } from './Game';

export class Layer {
  game: Game;
  image: any;
  speedModifier: any;
  height: number;
  width = 1768;
  x = 0;
  y = 0;

  constructor(game: Game, image: any, speedModifier: any) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.height = this.game.height;
  }

  update() {
    if (this.x <= -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y);
    this.game.ctx.drawImage(this.image, this.x + this.width, this.y);
  }
}
