import { Game } from './Game';

export class Control {
  // @ts-ignore
  isMobile = navigator.userAgentData.mobile;
  game: Game;
  private controlKeys = ['ArrowUp', 'ArrowDown'];
  private shootKey = ' ';

  constructor(game: Game) {
    this.game = game;

    if (this.isMobile) this.addMobileControl();
    else this.addDesktopControl();
  }

  addMobileControl() {
    try {
      if (this.isMobile) this.game.canvas.requestFullscreen();
    } catch (err) {
      console.log(err);
    }

    window.addEventListener('touchstart', (e) => {
      console.log('start');
    });

    document.addEventListener('touchmove', (e) => {
      const y = e.changedTouches[0].clientY;
      const yPlayer = this.game.player.y + this.game.player.height / 2;

      if (y < yPlayer && !this.game.keys.includes('ArrowUp')) {
        this.game.keys.push('ArrowUp');
        const index = this.game.keys.indexOf('ArrowDown');
        if (index > -1) this.game.keys.splice(index, 1);
      } else if (y > yPlayer && !this.game.keys.includes('ArrowDown')) {
        this.game.keys.push('ArrowDown');
        const index = this.game.keys.indexOf('ArrowUp');
        if (index > -1) this.game.keys.splice(index, 1);
      }
    });

    window.addEventListener('touchend', (e) => {
      const index = this.game.keys.indexOf('ArrowUp');
      const index2 = this.game.keys.indexOf('ArrowDown');
      if (index > -1) this.game.keys.splice(index, 1);
      if (index2 > -1) this.game.keys.splice(index2, 1);
    });
  }

  addDesktopControl() {
    window.addEventListener('keydown', (e) => {
      if (this.controlKeys.includes(e.key) && !this.game.keys.includes(e.key)) {
        this.game.keys.push(e.key);
      }
      if (this.shootKey === e.key) this.game.player.shoot();
      if (e.key === 'd') this.game.debug = !this.game.debug;
    });

    window.addEventListener('keyup', (e) => {
      const index = this.game.keys.indexOf(e.key);
      if (index > -1) this.game.keys.splice(index, 1);
    });
  }
}
