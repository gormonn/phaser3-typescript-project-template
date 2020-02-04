interface Config{
    w: number;
    h: number;
    x: number;
    y: number;
    start?: number;
    end: number;
    first?: number;
    repeatDelay?: number;
    repeat?: number;
}
export default class AnimationSprite{
    context: Phaser.Scene;
    name: string;
    path: string;
    cfg: Config;
    constructor(
        context: Phaser.Scene,
        name: string,
        path: string,
        {start = 0, first = 0, end, w, h, x, y, repeatDelay, repeat}: Config & Phaser.Types.Animations.Animation){
        this.context = context;
        this.name = name;
        this.path = path;
        this.cfg = {w, h, start, end, first, x, y, repeatDelay};
    }
    preload(){
        const {context, cfg, name, path} = this;
        const {w, h, end} = cfg;
        let config = {
            frameWidth: w,
            frameHeight: h,
            endFrame: end
        };
        context.load.spritesheet(name, path, config);
    }
    start(){
        const {context, cfg, name} = this;
        const {w, h, start, end, first, x, y, repeatDelay} = cfg;
        context.anims.create({
            key: 'explode',
            frames: context.anims.generateFrameNumbers(name, { start, end, first }),
            frameRate: 10,
            repeat: -1,
            repeatDelay
        });
        var boom = context.add.sprite(x, y, name, first);
        boom.anims.play('explode');
    }
}