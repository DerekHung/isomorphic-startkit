let soap = require('soap');
let unirest = require("unirest");
let apiDomain = 'your api domain';
let BackendUtil = {
	call(params, callback) {
			delete params.serverSide;

			if (/\?wsdl/.test(params.serverApiInfo.apiPath)) {
				this.callBySoap(params, callback);
			} else {
				this.callByRest(params, callback);
			}
		},

		callBySoap(params, callback) {
			let apiPath = params.serverApiInfo.apiPath;
			delete params.serverApiInfo;
			
			// use apiDomain, apiPath and params to get data after soap connected
		},

		callByRest(params, callback) {
			let method = params.serverApiInfo.method;
			let apiPath = params.serverApiInfo.apiPath;
			delete params.serverApiInfo;
			
			// use apiDomain, apiPath, method and params to get data

			callback({
				"nickName": "REX",
				"pid": "100080",
				"school": "SHU",
				"department": "MIS",
				"company": "104",
				"jobTitle": "Full Stack Developer",
				"personalCharacteristics": "TEST",
				"updateDate": 1447213438150,
				"createDate": 1436867972369
			});
		}
};

module.exports = BackendUtil;