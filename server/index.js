require('babel/register');
var backendServer = require('./server.js');

module.exports = function(frontendServer){
	return backendServer(frontendServer);
};