export default function jackpot() {
    const [screenW, screenH] = [1024, 768];

    //Aliases 設定別名
    let Application = PIXI.Application,
        resources = PIXI.loader.resources,
        loader = PIXI.loader,
        Sprite = PIXI.Sprite,
        TextureCache = PIXI.utils.TextureCache,
        Graphics = PIXI.Graphics,
        Container = PIXI.Container

    // Create a Pixi Application 
    let app = new Application({
        width: screenW,         // default: 1024
        height: screenH,        // default: 768
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1,       // default: 1
        backgroundColor: 0xeeeeee
    });

    // Add the canvas that Pixi automatically created for you to the HTML document 
    document.body.appendChild(app.view);

    // load an image and run the `loadImage` function when it's done
    loader
        .add([
            "images/icon.json",
            "images/border.png",
            "images/background.png",
            "images/button.png",
            "images/buttonGrey.png",
            "images/buttonRed.png"
        ])
        .load(initial);


    function initial() {
        var sprite = new PIXI.projection.Sprite2d();
        var container = new PIXI.projection.Container2d();

        sprite.proj.affine = PIXI.projection.AFFINE.AXIS_X;
        //由錨點做X軸向(橫向)旋轉
        sprite.proj.affine = PIXI.projection.AFFINE.AXIS_Y;
        //由錨點做Y軸向(縱向)旋轉
        sprite.proj.affine = PIXI.projection.AFFINE.NONE;
        //由錨點做平面旋轉



        let pos = container.toLocal(sprite.position, undefined, undefined, undefined,
             PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ);

        PIXI.projection.TRANSFORM_STEP.BEFORE_PROJ //讓抓取的世界座標為螢幕上的座標

        container.proj.setAxisX(pos, 1);  //X軸向(橫向)的投影 (投影點, 投影方向和放大率(負數為向投影點放大))
        container.proj.setAxisY(pos, -1);  //Y軸向(縱向)的投影 (投影點, 投影方向和放大率(負數為向投影點放大))




        container.proj.setAxisY(pos, -squareFar.factor);


        var sprite = new PIXI.projection.Sprite2d(new PIXI.Texture.fromImage('images/button.png'));
        sprite.anchor.set(0.5);
        sprite.proj.affine = PIXI.projection.AFFINE.AXIS_X; // return to affine after rotating
        sprite.position.set(app.screen.width / 2, app.screen.height / 2);
        app.stage.addChild(sprite);
        //sprite.tint = 0x00ff00

        var step = 0;

        app.ticker.add((delta) => {
            step += delta / 10;
            sprite.rotation = step * 0.1;
        });
    }



}