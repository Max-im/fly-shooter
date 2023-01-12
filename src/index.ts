import { Game } from "./components/Game";

const game = new Game();

let lastUpdateTime = 0;

function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastUpdateTime;
    lastUpdateTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
}
animate(0);