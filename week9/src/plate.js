export default class Plate {
    constructor(def) {
        this.container = new PIXI.projection.Container2d();
        this.container.position.set(def.app.screen.width / 2, def.app.screen.height);
        def.app.stage.addChild(this.container);

        this.screenWidth = def.app.screen.width;

        let texture = [];
        this.sprite = [];

        let spritePosY =  2 * def.app.screen.height;

        for (let i = 0; i < 4; i++) {
            texture[i] = def.TextureCache[`plate${i}.png`]
            this.sprite[i] = new PIXI.projection.Sprite2d(texture[i]);
            this.sprite[i].anchor.set(0.5, 1.0);

            // 圖片放大的倍率
            let rate =  4 * def.app.screen.width / this.sprite[i].width;

            // 圖片大小乘上倍率
            this.sprite[i].width *= rate;
            this.sprite[i].height *= rate;

            spritePosY -= this.sprite[i].height;

            this.sprite[i].y = -spritePosY + 5;
        }

        let worldPos = { x: this.screenWidth / 2, y: 100 }

        let pos = this.container.toLocal(worldPos, undefined, undefined, undefined, PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);
        pos.y = -pos.y;

        //投射成平面
        this.container.proj.setAxisY(pos, -1.1);
    }
}