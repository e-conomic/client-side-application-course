import path from 'path';

const frontend = path.join(__dirname, 'frontend');
const live = process.env.NODE_ENV === "production";
const indexHtml = path.join(__dirname, 'dist', 'index.html');

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
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			loaders: ["style", "css", "sass"]
		}, {
			test: indexHtml,
			loaders: [
				"file?name=[name].[ext]",
				"extract",
				"html?" + JSON.stringify({
					attrs: ["img:src", "link:href"]
				})
			]
		}, {
			test: /\.css$/,
			loaders: [
				"file",
				"extract",
				"css"
			]
		}]
	},
	sassLoader: {
		includePaths: [path.join(__dirname, 'dist', 'css')]
	}
}

export default config;
