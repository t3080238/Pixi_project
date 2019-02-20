export default class Plate {
    constructor(def) {
        this.container = new PIXI.projection.Container2d();
        this.container.position.set(def.app.screen.width / 2, def.app.screen.height);
        def.app.stage.addChild(this.container);

        this.screenWidth = def.app.screen.width;

        /*let texture = def.TextureCache["images/plate.png"];
        this.sprite = new PIXI.projection.Sprite2d(texture);
        this.sprite.anchor.set(0.5, 1.0);
        this.sprite.width = 4*def.app.screen.width;
        this.sprite.height = 2*def.app.screen.height;
        //this.sprite.position.set(def.app.screen.width / 2, def.app.screen.height);

        this.container.addChild(this.sprite);*/

        this.texture = [];
        this.sprite = [];

        let spritePosY =  2 * def.app.screen.height;

        for (let i = 0; i < 4; i++) {
            this.texture[i] = def.TextureCache[`plate${i}.png`]
            this.sprite[i] = new PIXI.projection.Sprite2d(this.texture[i]);
            this.sprite[i].anchor.set(0.5, 1.0);
            console.log( this.sprite[i].width, this.sprite[i].height);

            // 圖片放大的倍率
            let rate =  4 * def.app.screen.width / this.sprite[i].width;
            this.sprite[i].width *= rate;
            this.sprite[i].height *= rate;

            spritePosY -= this.sprite[i].height;

            this.sprite[i].y = -spritePosY + 5;

            //this.container.addChild(this.sprite[i])
        }




        let worldPos = { x: this.screenWidth / 2, y: 100 }
        console.log(worldPos);

        let pos = this.container.toLocal(worldPos, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
        console.log(pos);
        pos.y = -pos.y;

        //投射成平面
        this.container.proj.setAxisY(pos, -1.1);

    }

    update() {

    }
}