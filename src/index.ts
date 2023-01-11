import { Game } from "./components/Game";

const game = new Game();

function animate() {
    game.update();
    game.draw();
    requestAnimationFrame(animate);
}
animate();