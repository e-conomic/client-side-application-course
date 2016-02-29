module.exports = {
	context: __dirname + '/App',
	entry: './main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
		},
        {
            test: /\.css$/,
            loader: "style!css"
        }]
	},
}