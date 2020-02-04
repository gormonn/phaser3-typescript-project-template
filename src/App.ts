import 'phaser';
import GLBenchClass from 'gl-bench/dist/gl-bench.module';
import ImagesPreloader from './img/ImagesPreloader'
import GetCoordinates from './helpers/GetCoordinates'
import IMG from './img/images';
import {SCENES} from './const'

const imagesFilter = [
    IMG.BACKGROUND_MAIN,
    IMG.LABELS,
    IMG.LINES,
    // IMG.MONKEY
];

export default class MainScene extends Phaser.Scene {
    preloader?: ImagesPreloader;
    animMonkeyKey?: ImagesPreloader;
    constructor(){
        super(SCENES.MAIN);
    }

    preload(){
        new ImagesPreloader(this.load, imagesFilter).preload();
        this.animMonkeyKey = new ImagesPreloader(this.load, IMG.MONKEY.IDDLE, 'spritesheet', { frameWidth: 186, frameHeight: 107, endFrame: 8 });
        this.animMonkeyKey.preload();

        // this.load.atlas(IMG.MONKEY.IDDLE, 'assets/img/monkey/iddle.png', 'assets/img/monkey/iddle.json');
        // this.load.spritesheet(IMG.MONKEY.IDDLE, IMG.MONKEY.IDDLE, { frameWidth: 186, frameHeight: 107, endFrame: 8 });
        // this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        // this.load.glsl('stars', 'assets/starfields.glsl.js');
    }

    create(){
        this.add.image(480, 300, IMG.BACKGROUND_MAIN);
        const LABEL_LINE_POS = 565;
        this.add.image(100, LABEL_LINE_POS, IMG.LABELS.BALANCE);
        this.add.image(415, LABEL_LINE_POS, IMG.LABELS.PRIZE);
        this.add.image(685, LABEL_LINE_POS, IMG.LABELS.BET);
        // this.add.image(290, 370, IMG.MONKEY.MONKEY_IDDLE);
        // new GetCoordinates(this, IMG.MONKEY.IDDLE)

        this.anims.create({
            key: this.animMonkeyKey.lastKey,
            frames: this.anims.generateFrameNumbers(IMG.MONKEY.IDDLE, { start: 0, end: 8, first: 0 }),
            frameRate: 7,
            repeat: -1,
            repeatDelay: 5
        });
        var boom = this.add.sprite(105, 477, IMG.MONKEY.IDDLE, 0);
        boom.anims.play(this.animMonkeyKey.lastKey);

        // this.tweens.add({
        //     targets: logo,
        //     y: 350,
        //     duration: 1500,
        //     ease: 'Sine.inOut',
        //     yoyo: true,
        //     repeat: -1
        // })
    }
}

const config = {
    type: Phaser.AUTO,
    parent: "game_content",
    width: 960,
    height: 600,
    title: "Monkey Game",
    scene: MainScene
};

const game = new Phaser.Game(config);