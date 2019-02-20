export default class Rat {
    constructor(x, y, container, def) {
        let texture = def.TextureCache["images/rat.png"];
        //this.sprite = new def.Sprite(rattex);
        this.sprite = new PIXI.projection.Sprite2d(texture);
        this.sprite.proj.affine=PIXI.projection.AFFINE.AXIS_X ;
        this.sprite.anchor.set(0.5, 1.0);
        
        this.sprite.position.set(x, y);
        //def.app.stage.addChild(this.sprite);
        container.addChild(this.sprite);
    }
}