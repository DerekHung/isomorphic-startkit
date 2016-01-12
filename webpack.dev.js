var express = require('express');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');
var hook = require('css-modules-require-hook');
var frontendServer = express();

config.context = __dirname;
config.devtool = 'eval';
config.entry = [
		'webpack-hot-middleware/client'
	].concat(config.entry);
config.plugins = [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	].concat(config.plugins);
config.module.loaders[0].query.plugins.push([
		'react-transform', 
		{
			'transforms': [{
				'transform': 'react-transform-hmr',
				'imports': ['react'],
				'locals': ['module']
			}]
		}
	]);

var compiler = webpack(config);

hook({
	generateScopedName: '[name]__[local]___[hash:base64:5]',
});

frontendServer.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false, 
    publicPath: config.output.publicPath,
    stats: {
        colors: true 
    }

}));
frontendServer.use(require("webpack-hot-middleware")(compiler));

module.exports = frontendServer;