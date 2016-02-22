module.exports = {
  context: __dirname + '/app',
  entry: './main.js',
  output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
  },
  loaders:[
    {
  		test: /\.(js|jsx)$/,
  		loader: 'babel'
  	},
	]
}
