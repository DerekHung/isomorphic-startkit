var path = require('path');
var webpack = require('webpack');
var ExtracTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'./client/client'
	],
	debug: true,
	devtool: 'source-map',
	resolve: {
		root: [ __dirname ],
		extensions: ["", ".js", ".jsx"]
	},
	output: {
		path: path.join(__dirname, '/public/build'),
		publicPath: '/build',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.IgnorePlugin(new RegExp("asyncBeApi")),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new ExtracTextPlugin('bundle.css', {
			allChunks: true
		})
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
			loader: ExtracTextPlugin.extract('style',"css?modules&localIdentName=[name]__[local]___[hash:base64:5]"),
			include: __dirname
		}]
	}
};
