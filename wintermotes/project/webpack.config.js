var path = require('path');

module.exports = {
	entry: {
		full: ["./app/react-three-exposeglobals.js", "./app/app.js"]
	},
  	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/dist/",
		filename: "[name].bundle.js",
		libraryTarget: "var",
		library:"ReactTHREE"
   },
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
			include: path.join(__dirname, 'app'),
			exclude: /(node_modules|bower_components)/,
			query:
			{
				cacheDirectory: true,
				presets: ['es2015', 'stage-2'],
				plugins: ['transform-runtime']
			}
		}]
	}
}