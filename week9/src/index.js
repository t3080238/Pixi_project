import Sky from './sky.js'
import Rat from './rat.js'
import Plate from './plate.js';

window.onload = function () {

    const [screenW, screenH] = [1024, 768];
    const ratFrequence = 60

    let sky;
    let rat = [];
    let plate;
    let timer;

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

    let def = {
        app, Application, resources, loader, Sprite, TextureCache, Graphics, Container
    }

    // Add the canvas that Pixi automatically created for you to the HTML document 
    document.body.appendChild(app.view);

    // load an image and run the `loadImage` function when it's done
    loader
        .add([
            "images/plate.json",
            "images/sky.jpg",
            "images/plate.png",
            "images/rat.png"
        ])
        .load(initial);


    function initial() {

        sky = new Sky(def);
        plate = new Plate(def);

        for (let i = 0; i < 19; i++) {
            rat[i] = new Rat(i, (i % 7) * 250 - 760, Math.floor(i / 7) * 252 - 578, plate.container, def);
        }

        //為了讓老鼠可以從洞裡消失，下方的地板必須後放入container
        plate.container.addChild(plate.sprite[0]);
        for (let i = 0; i < 7; i++) {
            plate.container.addChild(rat[i].sprite);
        }
        plate.container.addChild(plate.sprite[1]);
        for (let i = 8; i < 13; i++) {
            plate.container.addChild(rat[i].sprite);
        }
        plate.container.addChild(plate.sprite[2]);
        for (let i = 16; i < 19; i++) {
            plate.container.addChild(rat[i].sprite);
        }
        plate.container.addChild(plate.sprite[3]);

        timer = 0;
        app.ticker.add((delta) => { Update(delta); });
    }

    function Update(delta) {
        timer += delta;
        sky.move(delta);
        plate.update()
        if (timer >= ratFrequence) {
            timer -= ratFrequence;
            let rand;
            do {
                rand = randomInt(0, 18);
            } while (rat[rand].isAppear === true)
            rat[rand].up();
        }
        for (let i = 0; i < 19; i++) {
            if (rat[i].isAppear === true && rat[i].isUse === true){
                console.log(i);
                rat[i].update(rat[i]);
            } 
        }

    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}