export default class GetCoordinates{
    constructor(context: Phaser.Scene, image){
        const Image = new Phaser.GameObjects.Image(context, 0, 0, image);
        const Coordinates = new Phaser.GameObjects.Text(context, 0, 0, `x: ${Image.x}, y: ${Image.y}`,
            { fontFamily: '"Roboto Condensed"' });
        context.add.existing(Image)
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