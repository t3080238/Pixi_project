const path = require('path');

module.exports = {
    entry: ['gsap/TweenMax.js', './src/index.js', 'pixi.js', './src/pixi-projection.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                ]
            }
        ]
    }
};