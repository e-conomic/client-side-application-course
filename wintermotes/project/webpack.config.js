var path = require('path');

module.exports = {
  entry: path.join(__dirname, "app", "react-three-exposeglobals.js"),

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
    libraryTarget: "var",
    library:"ReactTHREE"
  },
  
  module: {
    loaders: [
      {
	test: /\.js$/,
	loader: 'babel',
	include: path.join(__dirname, 'app'),
        exclude: /(node_modules|bower_components)/,
	query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime']
	}
      }
    ]
  }
}
