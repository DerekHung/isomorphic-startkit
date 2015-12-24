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
		path: '/js/build',
		publicPath: '/js/build',
		filename: 'bundle.js'
	},
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
								transforms: [{
									transform:  'react-transform-hmr',
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