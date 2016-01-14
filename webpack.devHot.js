var webpack = require('webpack');
var config = require('./webpack.config');
var hook = require('css-modules-require-hook');

module.exports = function checkMode(app){
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
	
	app.use(require("webpack-dev-middleware")(compiler, {
	    noInfo: false, 
	    publicPath: config.output.publicPath,
	    stats: {
	        colors: true 
	    }

	}));
	app.use(require("webpack-hot-middleware")(compiler));	
};