///<reference path = "SceneBase.ts" />

namespace Main {
    export class Boot extends SceneBase {
        public create(): void {
            console.log("Boot");
            this.scene.start("Preloader");
        }
    }
}