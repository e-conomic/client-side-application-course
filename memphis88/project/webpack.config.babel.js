import path from 'path';

const frontend = path.join(__dirname, 'frontend');

const config = {
	context: frontend,
	entry: './app.jsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		root: frontend,
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel',
		}]
	}
}

export default config;
