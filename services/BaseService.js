import utils from 'lodash';

let jquery = require('jquery');
let backend = null;

class BaseService {
	
	constructor() {
		this._apiPath = '';
	}
	
	_call(method, params, callback){
		if(params.serverSide){
			if(!backend){
				backend = require('server/services/BackendUtil');
			}
			
			params.serverApiInfo = {apiPath:this._apiPath, method:method};
			backend.call(params, callback);
		}else{
			if(jquery){
				jquery.ajax({
					method: method,
					url: '/ajax' + this._apiPath,
					data: params,
					dataType: 'json',
					success: function(response){
						callback(response);
					},
					error: function(error){
						callback({});
					}
				});
			}else{
				callback({});
			}
		}
	}
	
	get(params, callback) {
		this._call('get', params, callback);		
	}
	
	send(params, callback) {
		this._call('post', params, callback);
	}
};

export default BaseService;
