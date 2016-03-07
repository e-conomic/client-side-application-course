module.exports = {
	context: __dirname + '/app',
	entry: './app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.jsx'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
		}]
	},
}