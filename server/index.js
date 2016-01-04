require('babel-core/register');
var backendServer = require('./server.js');
// var hook = require('css-modules-require-hook');

// hook({
// 	generateScopedName: '[name]__[local]___[hash:base64:5]',
// })

module.exports = function(frontendServer){
	return backendServer(frontendServer);
};