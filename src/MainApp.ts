import 'phaser';
import Game from './main/Game'

namespace App {
    // game
    export let game: Phaser.Game = null;
}

function launch(): void {
    // let game = new Main.Game();
    let game = new Game();
    App.game = game;
}

window.onload = launch;