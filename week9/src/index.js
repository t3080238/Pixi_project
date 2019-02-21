import './css/rwd.css';
import Sky from './sky.js'
import Rat from './rat.js'
import Plate from './plate.js';
import ScoreSystem from './scoreSystem.js';

window.onload = function () {

    const [screenW, screenH] = [1024, 768];
    const [ratFrequence, ratUpSpeed, ratDownSpeed, ratUpTime] = [60, 20, 10, 30]
    const gameTime = 30;

    let sky;
    let rat = [];
    let plate;
    let timer;
    let score;

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
            "images/plate.json",
            "images/sky.jpg",
            "images/rat.png"
        ])
        .load(initial);

    function initial() {

        let def = {
            app, Application, resources, loader, Sprite, TextureCache, Graphics, Container
        }

        // 創建天空
        sky = new Sky(def);

        // 創建地板
        plate = new Plate(def);

        // 創建分數顯示
        score = new ScoreSystem(gameTime, def);

        let ratSet = { ratUpSpeed, ratDownSpeed, ratUpTime, score };

        // 創建老鼠
        for (let i = 0; i < 19; i++) {
            rat[i] = new Rat(i, ratSet, def);
        }

        // 為了讓老鼠可以從洞裡消失，下方的地板必須後放入container
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

        // 設定計時
        timer = ratFrequence / 2;
        app.ticker.add((delta) => { Update(delta); });
    }

    function Update(delta) {
        sky.move(delta);
        
        for (let i = 0; i < 19; i++) {
            rat[i].update(delta);
        }

        // 遊戲結束就不計時
        if (score.update(delta) === false) return;

        timer += delta;

        if (timer >= ratFrequence) {
            // 老鼠出現
            timer -= ratFrequence;

            let rand = randomInt(0, 18);
            // 挑一隻未出現的老鼠
            while (rat[rand].isAppear === true) {
                rand = randomInt(0, 18);
            }

            rat[rand].up();
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}