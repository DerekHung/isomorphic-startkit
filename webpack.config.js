var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./client'
	],
	resolve: {
		root: [ __dirname ]
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
		}]
	}
};
