require('babel-core/register');
global.serverSide = true;
module.exports = require('./server.js');