import Promise from 'bluebird';

let serviceMap = {};

function capitalizeFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function asyncBeApi(store){
 	return (next) => (action) => {
		if ( !action['CALL_API'] ) {
			return next(action);
		}
		
		let request = action['CALL_API'];
		let type = request.type;
		let httpMethod = request.method;
		let target = request.target;
		let params = request.params || {};
		let targetArray = target.split('/');
		let targetService = '';
		let targetMethod = '';
		
		if(/\:.+/.test(target)){
			targetService = capitalizeFirstLetter(targetArray[1]);
			targetMethod = httpMethod + targetService;
		}else{
			targetService = capitalizeFirstLetter(targetArray[1]);
			targetMethod = httpMethod + (targetArray[2] ? capitalizeFirstLetter(targetArray[2]) : targetService);
		}		
		
		return new Promise((resolve, reject) => {
			let serviceName = targetService+'Service'; 
			let serviceInstance = null;
			
			if(!serviceMap[serviceName]){
				let service = require('server/services/' + serviceName);
				service = service.default;
				
				serviceInstance = service.getInstance();
				serviceMap[serviceName] = serviceInstance
			}else{
				serviceInstance = serviceMap[serviceName];
			}
			
			serviceInstance[targetMethod](params, (response) => {
				next({
					type: type,
					response: response
				});
				
				resolve();
			});
		});
	};
}

module.exports = asyncBeApi;