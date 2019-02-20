import { TweenMax } from "gsap";

export default class Rat {
    constructor(i, x, y, container, def) {
        this.num = i;
        if (i === 7 || i === 13 || i === 14 || i === 15) {
            this.isAppear = true;
            this.isUse = false;
            return;
        }
        this.isAppear = false;
        this.isUse = true;

        let texture = def.TextureCache["images/rat.png"];
        //this.sprite = new def.Sprite(rattex);
        this.sprite = new PIXI.projection.Sprite2d(texture);
        this.sprite.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        this.sprite.anchor.set(0.5, 0.0);
        this.anchorY = 0.0;

        this.sprite.position.set(x, y);
        //def.app.stage.addChild(this.sprite);
        //container.addChild(this.sprite);

    }

    up() {
        let tl = new TimelineMax();
        tl.to(this, 0.5, { anchorY: 1 });
        this.isAppear = true;
    }

    update() {
        console.log(this.num, this.anchorY);
        this.sprite.anchor.set(0.5, this.anchorY);
    }
}