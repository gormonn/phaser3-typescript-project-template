import SceneBase from './SceneBase'

export default class Boot extends SceneBase {
    public create(): void {
        console.log("Boot");
        this.scene.start("Preloader");
    }
}