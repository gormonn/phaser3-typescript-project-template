const startPos = 400;
export default class GetCoordinates{
    constructor(context: Phaser.Scene, image: string | Phaser.GameObjects.Graphics, width:number = 50, height:number = 50){
        let Image;
        if(image instanceof Phaser.GameObjects.Graphics){
            // Image = context.make.graphics({x: startPos, y: startPos}, true);
            // Image.lineStyle(1, 0xFF00FF, 1.0);
            image.strokeRect(0, 0, width, height);
            Image = context.add.existing(image);
            console.log({Image})
            // Image.strokeRect(0, 0, width, height);

        }else if(typeof image === 'string'){
            Image = new Phaser.GameObjects.Image(context, startPos, startPos, image);
            context.add.existing(Image)
        }

        const Coordinates = new Phaser.GameObjects.Text(context, startPos, startPos, `x: ${Image.x}, y: ${Image.y}`,
            { fontFamily: '"Roboto Condensed"' });
        context.add.existing(Coordinates)
        Image.setInteractive()
        context.input.setDraggable(Image)
        context.input.on('drag', (pointer: any, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
            gameObject.x = dragX
            gameObject.y = dragY
            Coordinates.setText(`x: ${Image.x}, y: ${Image.y}`)
        });
    }
}