import GLBenchClass from 'gl-bench/dist/gl-bench.module'
import SceneBase from './SceneBase'

//  600px in 20 seconds
//  600 / 20 = 30px per second
//  30 / 1000 = 0.03px per ms
const SPEED : number = (600 / 2) / 1000;

export default class Menu extends SceneBase {
    public bench;
    //     public bench = {
    //     addUI: ()=>{},
    //     nextFrame: ()=>{},
    //     begin: ()=>{},
    //     end: ()=>{},
    // }

    public create(): void {
        console.log("Menu");

        // если webgl, то монитор ресурсов будет работать
        if(this.game.context instanceof WebGLRenderingContext){
            this.bench = new GLBenchClass(this.game.context);
            console.log('Моник вкл')
        }else{
            console.log('Моник выкл')
        }

        // background color
        this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x808080);

        // focus on 0, 0
        this.setView();

        // red circle
        let graphics = this.add.graphics();
        graphics.fillStyle(0xff0000);
        graphics.fillCircle(0, 0, 50);
        this.add.text(0, 0, 'text');
    }
    public update(time, delta): void {
        this.bench.begin();
        // some bottleneck
        // console.log({time, delta})
        this.bench.end();
        this.bench.nextFrame(time);
    }
}