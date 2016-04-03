var path = require("path");
var app = path.join(__dirname, 'app');
module.exports = {
    context: app,
    entry: './app.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        root: app,
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
        }]
    }
}
