import { Game } from "./Game";
import { Layer } from "./Layer";

export class Background {
    game: Game;
    layers: Layer[] = [];
    topLayers: Layer[] = [];

    constructor(game: Game) {
        this.game = game;
        
        const image1 = <HTMLImageElement>document.getElementById('layer1');
        const image2 = <HTMLImageElement>document.getElementById('layer2');
        const image3 = <HTMLImageElement>document.getElementById('layer3');
        const image4 = <HTMLImageElement>document.getElementById('layer4');

        this.layers = [
            new Layer(this.game, image1, 0.2),
            new Layer(this.game, image2, 0.4),
            new Layer(this.game, image3, 1),
        ];
        this.topLayers = [
            new Layer(this.game, image4, 1.5)
        ]
    }

    update() {
        this.layers.forEach(layer => layer.update());
    }

    postUpdate() {
        this.topLayers.forEach(layer => layer.update());
    }

    draw() {
        this.layers.forEach(layer => layer.draw());
    }
    
    postDraw() {
        this.topLayers.forEach(layer => layer.draw());
    }
}