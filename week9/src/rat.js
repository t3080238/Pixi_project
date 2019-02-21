export default class Rat {
    constructor(n, ratSet, def) {
        this.num = n;
        
        //不需要顯示的老鼠
        if (n === 7 || n === 13 || n === 14 || n === 15) {
            this.isAppear = true;
            this.isUse = false;
            return;
        }

        this.score = ratSet.score; //////////////

        this.set = ratSet;
        this.isAppear = false;
        this.isUse = true;
        this.isHit = false;
        this.timer = 0;

        let texture = def.TextureCache["images/rat.png"];
        this.sprite = new PIXI.projection.Sprite2d(texture);
        this.sprite.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        this.sprite.anchor.set(0.5, 0.0);
        this.anchorY = 0.0;

        this.sprite.position.set((n % 7) * 250 - 770, Math.floor(n / 7) * 252 - 578);

        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.visible = false;

        this.sprite.on('pointerdown', () => { this.hitRat(); });
    }

    up() {
        let tl = new TimelineMax();
        tl.to(this, this.set.ratUpSpeed / 60, { anchorY: 1, ease: Power4.easeIn })
            .set(this, { isAppear: true })
        this.sprite.visible = true;
        this.timer = 0;
    }

    update(delta) {
        if (this.isUse === false) return;
        if (this.isHit === true) return;

        //更新老鼠圖片位置
        this.sprite.anchor.set(0.5, this.anchorY);

        if (this.sprite.visible === false) return;

        //老鼠有出現會做的事
        this.timer += delta;

        //老鼠要下去的時候
        if (this.timer >= this.set.ratUpTime) {
            let tl = new TimelineMax();
            this.timer = 0;

            tl.to(this, this.set.ratDownSpeed / 60, {
                anchorY: 0, ease: Power0.easeNone,
                onUpdate: () => {
                    // 下去的過程中被打到就要停止下去
                    if (this.isHit === true) tl.stop();
                }
            })
                .set(this, { isAppear: false })
                .set(this.sprite, { visible: false })
        }
    }

    hitRat() {
        if (this.isAppear === false) return;
        if (this.isHit === true)return;

        this.isHit = true;

        // 倒下
        this.sprite.anchor.set(0.5, 1.0);
        this.sprite.proj.affine = PIXI.projection.AFFINE.NONE;

        // 得分
        if( this.num < 7) this.score.addScore(5); 
        else if( this.num < 13) this.score.addScore(3); 
        else if( this.num < 19) this.score.addScore(1); 

        // 淡出
        let tl = new TimelineMax();
        tl.to(this.sprite, 1, { alpha: 0, ease: Power0.easeNone })
            .add(() => {
                this.anchorY = 0.0;
                this.timer = 0;
                this.sprite.proj.affine = PIXI.projection.AFFINE.AXIS_X;
                this.sprite.alpha = 1;
                this.sprite.visible = false
                this.isAppear = false;
                this.isHit = false;
            })
    }
}