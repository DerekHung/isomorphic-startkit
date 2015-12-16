var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var options = { 
	host: 'localhost',
	port: 3000,
	publicPath: '/',
	outputPath: '/',
	filename: 'bundle.js',
	watchOptions: undefined,
	watchDelay: undefined,
	hot: false,
	contentBase: path.join(__dirname, 'build'),
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
	historyApiFallback: true 
};
var protocol = options.https ? "https" : "http";
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, options);

server.listen(options.port, options.host, function (err) {
	if(err){
		throw err;
	}
	
	if(options.inline){
		console.log(protocol + "://" + options.host + ":" + options.port + "/");
	}else{
		console.log(protocol + "://" + options.host + ":" + options.port + "/webpack-dev-server/");
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


//webpack-dev-server --inline --history-api-fallback --port 3000 --progess --colors --content-base build