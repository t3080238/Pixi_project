import Sky from './sky.js'
import Rat from './rat.js'
import Plate from './plate.js';

window.onload = function () {

    const [screenW, screenH] = [1024, 768];

    let sky;
    let rat = [];
    let plate;

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
            if(i ===7|| i ===13||i ===14||i ===15)continue;
            rat[i] = new Rat((i % 7)*250 - 760 , Math.floor(i / 7)*250 - 580, plate.container, def);
        }


        app.ticker.add((delta) => { Update(delta); });
    }

    function Update(delta) {
        sky.move(delta);
        plate.update()
    }
}