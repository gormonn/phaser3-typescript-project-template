import 'phaser';

namespace App {
    // game
    export let game: Phaser.Game = null;
}

function launch(): void {
    let game = new Main.Game();
    App.game = game;
}

window.onload = launch;