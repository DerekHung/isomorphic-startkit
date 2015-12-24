require('babel-core/register');
require('babel-polyfill');
var backendServer = require('./server.js');

module.exports = function(frontendServer){
	console.log(backendServer);
	return backendServer(frontendServer);
};