import 'phaser';
import GLBenchClass from 'gl-bench/dist/gl-bench.module';
import ImagesPreloader from './img/ImagesPreloader'
import GetCoordinates from './helpers/GetCoordinates'
import IMG from './img/images';
import {SCENES,IMG_TYPE_SPRITESHEET} from './const'

const imagesFilter = [
    IMG.BACKGROUND_MAIN,
    IMG.LABELS,
    // IMG.LINES,
    // IMG.MONKEY
];
function drawStar (graphics, cx, cy, spikes, outerRadius, innerRadius, color, lineColor){
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    graphics.save();
    graphics.lineStyle(4, lineColor, 1);
    graphics.fillStyle(color, 1);
    graphics.beginPath();
    graphics.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++)
    {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        graphics.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        graphics.lineTo(x, y);
        rot += step;
    }

    graphics.lineTo(cx, cy - outerRadius);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();
    graphics.restore();
}
// @benchmark
export default class MainScene extends Phaser.Scene {
    public bench;
    imagesPreloader: ImagesPreloader;
    animMonkey: ImagesPreloader;
    lineLabels: ImagesPreloader;
    reelSymbols: ImagesPreloader;
    rootContainer: Phaser.GameObjects.Container;

    constructor(){
        super(SCENES.MAIN);
    }

    preload(){
        this.imagesPreloader = new ImagesPreloader(this.load, imagesFilter);
        this.imagesPreloader.preload();

        this.animMonkey = new ImagesPreloader(this.load, IMG.MONKEY.IDDLE, IMG_TYPE_SPRITESHEET, 
        { frameWidth: 186, frameHeight: 107, endFrame: 8 });
        this.animMonkey.preload();

        this.lineLabels = new ImagesPreloader(this.load, [IMG.LINES], IMG_TYPE_SPRITESHEET, 
        { frameWidth: 42, frameHeight: 42 });
        this.lineLabels.preload();

        this.reelSymbols = new ImagesPreloader(this.load, [IMG.REEL.SYM09,IMG.REEL.SYMBOLS], IMG_TYPE_SPRITESHEET, 
        { frameWidth: 116, frameHeight: 116 });
        this.reelSymbols.preload();

        // this.load.atlas(IMG.MONKEY.IDDLE, 'assets/img/monkey/iddle.png', 'assets/img/monkey/iddle.json');
        // this.load.spritesheet(IMG.MONKEY.IDDLE, IMG.MONKEY.IDDLE, { frameWidth: 186, frameHeight: 107, endFrame: 8 });
        // this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        // this.load.glsl('stars', 'assets/starfields.glsl.js');
    }
    create(){
        this.createBenchmark();
        this.createBackground();
        this.createLabels();
        this.createLineNumbers();
        this.createReels();
        this.createMonkeyAnimation();        


        // new GetCoordinates(this, IMG.REEL.SYMBOLS);
        
        // this.tweens.add({
        //     targets: logo,
        //     y: 350,
        //     duration: 1500,
        //     ease: 'Sine.inOut',
        //     yoyo: true,
        //     repeat: -1
        // })
    }
    
    update(time, delta): void {
        this.bench && this.bench.begin();
        // some bottleneck
        // console.log({time, delta})
        this.bench && this.bench.end();
        this.bench && this.bench.nextFrame(time);
    }
    
    createReels(){
        this.anims.create({
            key: IMG.REEL.SYMBOLS,
            frames: this.anims.generateFrameNumbers(IMG.REEL.SYMBOLS, { start: 0, end: 8, first: 0 }),
            frameRate: 10,
            repeat: -1
        });

        const reelMask = this.make.graphics({x: 140, y: 110}, false).fillRect(0, 0, 700, 400);

        // Анимация колонок
        const addRow = (left, top, imgKey, startFrame) => {
            let col = this.add.sprite(left, top, imgKey, startFrame);
            col.anims.play(imgKey);
            col.mask = new Phaser.Display.Masks.GeometryMask(this, reelMask);
        }
        const addRows = (left, top, imgKey) => {
            const margin = 42 * 3 + 5;
            addRow(left, top, imgKey, 0);
            addRow(left, top+margin, imgKey, 1);
            addRow(left, top+margin*2, imgKey, 2);
            addRow(left, top+margin*3, imgKey, 2);
        }
        addRows(200,175,IMG.REEL.SYMBOLS);
    }

    createMonkeyAnimation(){
        // Анимация обезьяны
        this.anims.create({
            key: IMG.MONKEY.IDDLE,
            frames: this.anims.generateFrameNumbers(IMG.MONKEY.IDDLE, { start: 0, end: 8, first: 0 }),
            frameRate: 7,
            repeat: -1,
            repeatDelay: 5
        });
        let monkey = this.add.sprite(105, 477, IMG.MONKEY.IDDLE, 0);
        monkey.anims.play(IMG.MONKEY.IDDLE);
    }

    createBenchmark(){
        // benchmark
        // если webgl, то монитор ресурсов будет работать
        if(this.game.context instanceof WebGLRenderingContext){
            this.bench = new GLBenchClass(this.game.context);
            console.log('Моник вкл')
        }else{
            // todo: добавить монитор для канваса
            console.log('Моник выкл')
        }
    }
    createLineNumbers(){
        // номера линий
        const addLine = (side, top, imgKey) => {
            const button = this.add.sprite(side, top, imgKey).setFrame(1).setInteractive();
            button
            .on('pointerover', ()=>{
                button.setFrame(0);
            })
            .on('pointerout', ()=>{
                button.setFrame(1);
            })
        }
        const addLines = side => {
            const margin = 40;
            const padding = 10;
            addLine(side, 300-margin*4-padding, IMG.LINES.NUMBER_2);
            addLine(side, 300-margin*3-padding, IMG.LINES.NUMBER_6);
            addLine(side, 300-margin*2-padding, IMG.LINES.NUMBER_4);

            addLine(side, 300-margin, IMG.LINES.NUMBER_8);
            addLine(side, 300, IMG.LINES.NUMBER_1);
            addLine(side, 300+margin, IMG.LINES.NUMBER_9);

            addLine(side, 300+margin*2+padding, IMG.LINES.NUMBER_5);
            addLine(side, 300+margin*3+padding, IMG.LINES.NUMBER_7);
            addLine(side, 300+margin*4+padding, IMG.LINES.NUMBER_3);
        }

        const left = 120;
        const right = 850;
        addLines(left);
        addLines(right);
    }
    createLabels(){
        const LABEL_LINE_POS = 565;
        // подписи баланс, приз, ставка
        this.add.image(100, LABEL_LINE_POS, IMG.LABELS.BALANCE);
        this.add.image(415, LABEL_LINE_POS, IMG.LABELS.PRIZE);
        this.add.image(685, LABEL_LINE_POS, IMG.LABELS.BET);
    }
    createBackground(){
        // фон
        this.add.image(480, 300, IMG.BACKGROUND_MAIN);
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