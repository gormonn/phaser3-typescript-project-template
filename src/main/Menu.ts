import SceneBase from './SceneBase'

//  600px in 20 seconds
//  600 / 20 = 30px per second
//  30 / 1000 = 0.03px per ms
const SPEED : number = (600 / 2) / 1000;

export default class Menu extends SceneBase {
    public create(): void {
        console.log("Menu");
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
        // console.log({time, delta})
        
    }
}