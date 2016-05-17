module.exports = {
	context: __dirname + '/app',
	entry: './app.jsx',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel'
		}, {
			test: /\.(json)$/,
			loader: 'json-loader'
		}]
	}
};