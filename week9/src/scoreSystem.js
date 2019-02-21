export default class ScoreSystem {
    constructor(gameTime, def) {
        this.gameTime = gameTime * 60;
        this.remainTime = this.gameTime;
        this.screenWidth = def.app.screen.width;
        this.screenHeight = def.app.screen.height

        // 字型設定
        this.styleBlue = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 80,
            fill: "#91D7F3",
            stroke: '#0000FF',
            strokeThickness: 6
        });

        this.styleGreen = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 72,
            fill: "#55FF7F",
            stroke: '#368B36',
            strokeThickness: 6
        });

        this.styleRed = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 72,
            fill: "#FFAFAF",
            stroke: '#FF0000',
            strokeThickness: 6
        });

        this.styleYellow = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 72,
            fill: "#FFFF00",
            stroke: '#FF6830',
            strokeThickness: 6
        });

        this.styleBig = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 144,
            fill: "#FFFF00",
            stroke: '#FF6830',
            strokeThickness: 6
        });

        // 分數文字
        this.score = 0;
        this.scoreText = new PIXI.Text(this.score, this.styleYellow);
        this.scoreText.position.set(20, 20);
        def.app.stage.addChild(this.scoreText);

        // 秒數倒數文字
        this.timeText = new PIXI.Text(this.gameTime, this.styleGreen);
        this.timeText.position.set(this.screenWidth - 100, 20);
        def.app.stage.addChild(this.timeText);

        // Replay文字
        this.replayText = new PIXI.Text("Replay", this.styleBlue);
        this.replayText.x = (this.screenWidth - this.replayText.width) / 2;
        this.replayText.y = this.screenHeight / 2;
        this.replayText.visible = false;

        this.replayText.interactive = false;
        this.replayText.buttonMode = true;
        this.replayText.on('pointerdown', () => { this.hitReplay(); });

        def.app.stage.addChild(this.replayText);
    }

    addScore(score) {
        this.score += score;
        this.scoreText.text = this.score;
    }

    update(delta) {
        if (this.remainTime <= 0) return false;

        this.remainTime -= delta;
        this.timeText.text = Math.floor(this.remainTime / 60) + 1;

        if (this.remainTime <= 600) this.timeText.style = this.styleRed;

        if (this.remainTime <= 0) {
            this.remainTime = 0;
            this.showEnd();
        }
        return true;
    }

    showEnd() {
        this.scoreText.style = this.styleBig;
        this.scoreText.alpha = 0;
        this.scoreText.x = (this.screenWidth - this.scoreText.width) / 2;
        this.scoreText.y = (this.screenHeight - this.scoreText.height) / 2 - 100;

        this.replayText.visible = true;
        this.replayText.alpha = 0;

        let tl = new TimelineMax();
        tl.to(this.scoreText, 1, { alpha: 1 }, 1)
            .to(this.replayText, 1, { alpha: 1 }, '-=1')
            // 跑完動畫才可以按Replay
            .set(this.replayText, { interactive: true })
    }

    hitReplay() {
        this.score = 0;

        this.scoreText.text = this.score;
        this.scoreText.position.set(20, 20);
        this.scoreText.style = this.styleYellow;

        this.timeText.style = this.styleGreen;

        this.remainTime = this.gameTime;

        this.replayText.visible = false;
        this.replayText.interactive = false;

    }
}