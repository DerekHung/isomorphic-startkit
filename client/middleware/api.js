import Promise from 'bluebird';

export const CALL_API = Symbol('CALL_API');
export default (store) => (next) => (action) => {
	if ( ! action[CALL_API] ) {
		return next(action);
	}

	let request = action[CALL_API];
	let { getState } = store;
	
	return new Promise((resolve, reject) => {
		if(typeof __REDUX_STATE__ !== 'undefined' && (getState() === window.__REDUX_STATE__)){
			window.__REDUX_STATE__ = {};
			resolve();
		}else{
			request((type, response) => {
				next({
					type: type,
					response: response
				});
				
				resolve();
			});
		}
	});
};