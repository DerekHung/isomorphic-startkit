import superagent from 'superagent';
import Promise from 'bluebird';
import utils from 'lodash';

export const CALL_API = Symbol('CALL_API');

export default (store) => {
	return (next) => {
		return (action) => {
			if ( ! action[CALL_API] ) {
				return next(action);
			}
			
			let { getState } = store;
			let deferred = Promise.defer();
			let request = action[CALL_API];
			let { method, url, params, successType } = request;
			
			//rest api
			superagent[method](url).end((err, response) => {
				if(!err && response && response.body){
					next({
						type: successType,
						response: response.body
					});
					
					if (utils.isFunction(request.afterSuccess)) {
						request.afterSuccess({ getState });
					}
				}

				//resolve
				deferred.resolve();
			});
			
			//promise
			return deferred.promise;
		};
	};
};