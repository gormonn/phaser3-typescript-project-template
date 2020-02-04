import ImagesPreloader from './img/ImagesPreloader'
import IMG from './img/images';

class NumberSprite extends Phaser.GameObjects.GameObject{
    lineLabels?: ImagesPreloader;
    create(){
        
    }
}

// class Numbers extends Phaser.GameObjects.Group{
//     scene: Phaser.Scene;
//     children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig;
//     config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig;
//     constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.GameObjects.Group.GroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig){
//         super(scene);
//         this.children = [];
//     }
// }