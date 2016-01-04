var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./client'
	],
	resolve: {
		root: [ __dirname ],
		extensions: ["", ".js", ".jsx"]
	},
	output: {
		path: '/js/build',
		publicPath: '/js/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
                plugins: [
                    ['react-transform', {
                        'transforms': [{
                            'transform': 'react-transform-hmr',
                            'imports': ['react'],
                            'locals': ['module']
                        }]
                    }]
                ]
            }
        },
        {
            test: /\.css$/,
            include: __dirname,
            loader: "style-loader!css-loader"
        },
		]
	}
};
