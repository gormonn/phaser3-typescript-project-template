import SceneBase from './SceneBase'

export default class Preloader extends SceneBase {
    public create(): void {
        console.log("Preloader");
        this.scene.start("Menu");
    }
    // public preload():void{
    //     console.log("Loading assets...");
    //     this.load.atlas("Sprites", "assets/sprites/Sprites.png", "assets/sprites/Sprites.json")
    // }
}