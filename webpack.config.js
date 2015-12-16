var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./client'
	],
	resolve: {
		root: [ __dirname ]
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			include: __dirname,
			query: {
				optional: ['runtime'],
				stage: 2,
				env: {
					development: {
						plugins: [
							'react-transform'
						],
						extra: {
							'react-transform': {
								'transforms': [{
									'transform':  'react-transform-hmr',
									imports: ['react'],
									locals:  ['module']
								}]
							}
						}
					}
				}
			}
		}]
	}
};