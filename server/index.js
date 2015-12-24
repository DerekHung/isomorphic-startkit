require('babel-core/register');
var backendServer = require('./server.js');

module.exports = function(frontendServer){
	console.log(backendServer);
	return backendServer(frontendServer);
};
