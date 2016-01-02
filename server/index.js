//global.serverSide = true;
require('babel-core/register');
var backendServer = require('./server.js');

module.exports = function(frontendServer){
	return backendServer(frontendServer);
};