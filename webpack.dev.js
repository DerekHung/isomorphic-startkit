var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var options = { 
	host: 'localhost',
	port: 3000,
	publicPath: config.output.publicPath,
	outputPath: config.output.path,
	filename: config.output.filename,
	watchOptions: undefined,
	watchDelay: undefined,
	hot: true,
	contentBase: false,
	stats:{ 
		cached: false,
		cachedAssets: false,
		colors: {
			level: 1, 
			hasBasic: true, 
			has256: false, 
			has16m: false 
		}
	},
	inline: true,
	historyApiFallback: false
};
options.protocol = options.https ? "https" : "http"; 
config.entry = [
	require.resolve("webpack-dev-server/client/") + "?" + options.protocol + "://" + options.host + ":" + options.port, 
	'webpack/hot/dev-server'].concat(config.entry);
config.plugins = [
	new webpack.HotModuleReplacementPlugin()
];
config.context = __dirname;

var compiler = webpack(config);
var frontendServer = new WebpackDevServer(compiler, options);

frontendServer.app.set('port', options.port);
frontendServer.listen(options.port, options.host, function (err) {
	if(err){
		throw err;
	}
	
	if(options.inline){
		console.log(options.protocol + "://" + options.host + ":" + options.port + "/");
	}else{
		console.log(options.protocol + "://" + options.host + ":" + options.port + "/webpack-dev-server/");
	}
	
	console.log("webpack result is served from " + options.publicPath);
	
	if(typeof options.contentBase === "object"){
		console.log("requests are proxied to " + options.contentBase.target);
	}else{
		console.log("content is served from " + options.contentBase);
	}
	
	if(options.historyApiFallback){
		console.log("404s will fallback to %s", options.historyApiFallback.index || "/index.html");
	}
});

module.exports = frontendServer;