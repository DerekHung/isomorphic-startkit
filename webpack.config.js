var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./client'
	],
	debug:true,
	resolve: {
		root: [ __dirname ],
		extensions: ["", ".js", ".jsx"]
	},
	output: {
		path: path.join(__dirname, '/public/js/build'),
		publicPath: '/js/build',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.IgnorePlugin(new RegExp("BackendUtil")),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			include: __dirname,
			query: {
				plugins: []
			}
		},
		{
			test: /\.css$/,
			loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]",
			include: __dirname
		}]
	}
};
