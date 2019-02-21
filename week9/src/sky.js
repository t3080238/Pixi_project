export default class Sky {
    constructor(def) {
        let skytex = def.TextureCache["images/sky.jpg"];
        this.tiling = new PIXI.projection.TilingSprite2d(skytex);

        this.width = def.app.screen.width;
        this.height = def.app.screen.height;

        this.tiling.width = this.width;
        this.tiling.height = this.height;

        this.tiling.anchor.set(0.5, 1.0);
        this.tiling.position.set(def.app.screen.width / 2, this.height);

        def.app.stage.addChild(this.tiling);
    }

    move(delta) {
        let pos = {};
        pos.x = this.width / 2;
        pos.y = this.height / 2 + 10;

        this.tiling.tilePosition.x = (this.tiling.tilePosition.x + delta) % this.tiling.texture.width;

        this.tiling.tileProj.setAxisY(pos, -1);
    }
}