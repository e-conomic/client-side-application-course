'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frontend = _path2.default.join(__dirname, 'frontend');
var live = process.env.NODE_ENV === "production";
var indexHtml = _path2.default.join(__dirname, 'dist', 'index.html');

var config = {
	context: frontend,
	entry: './app.jsx',
	output: {
		path: _path2.default.join(__dirname, 'dist'),
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
			loader: 'babel'
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			loaders: ["style", "css", "sass"]
		}, {
			test: indexHtml,
			exclude: /node_modules/,
			loaders: ["file?name=[name].[ext]", "extract", "html?" + JSON.stringify({
				attrs: ["img:src", "link:href"]
			})]
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			loaders: ["file", "extract", "css"]
		}]
	},

	sassLoader: {
		includePaths: [_path2.default.join(frontend, 'style')]
	}
};

exports.default = config;

