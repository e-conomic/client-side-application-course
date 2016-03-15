var path = require("path");
module.exports = {
    context: path.join(__dirname, 'app'),
    entry: './app.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        root: path.join(__dirname, 'app'),
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
        }]
    },
    watch: true
}
