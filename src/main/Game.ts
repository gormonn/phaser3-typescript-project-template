import gameConfig from './gameConfig'
import Boot from './Boot'
import Preloader from './Preload'
import Menu from './Menu'

export default class Game extends Phaser.Game {
    constructor() {
        // init game
        super({
            ...gameConfig,
            title: "Monkey Game"
        });
        // states
        this.scene.add("Boot", Boot);
        this.scene.add("Preloader", Preloader);
        this.scene.add("Menu", Menu);
        // start
        this.scene.start("Boot");
    }
}