import Promise from 'bluebird';
import Superagent from 'superagent';

function asyncFeApi(store){
 	return (next) => (action) => {
		if ( !action['CALL_API'] ) {
			return next(action);
		}
		
		let request = action['CALL_API'];
		let type = request.type;
		let httpMethod = request.method;
		let target = request.target;
		let params = request.params || {};
		let namespace = '';
		
		if(/\:.+/.test(target)){
			let targetArray = target.split('/');
			let namespaceAry = [];
		
			targetArray.map((space) => {
				if(space){
					if(/\:.+/.test(space)){
						let name = space.replace(':', '');
						
						if(params[name]){
							namespaceAry.push(params[name]);
							delete params[name];
						}
					}else{
						namespaceAry.push(space);
					}
				}
			});
			
			namespace = '/' + namespaceAry.join('/');
		}else{
			namespace = target;
		}		
		
		return new Promise((resolve, reject) => {
			
			function responseCallback(e, response){
				next({
					type: type,
					response: response.body
				});
				
				resolve();
			}
			
			delete params.serverSide;
			
			httpMethod = httpMethod.toLowerCase();
			target = '/ajax' + namespace;
			
			switch(httpMethod){
				case 'get':
					Superagent.get(target).end(responseCallback);
					break;
					
				case 'post':
					Superagent.post(target).send(params).end(responseCallback);
					break;
					
				case 'put':
					Superagent.put(target).send(params).end(responseCallback);
					break;
					
				case 'delete':
					Superagent.del(target).end(responseCallback);
					break;
			}
		});
	};
}

module.exports = asyncFeApi;