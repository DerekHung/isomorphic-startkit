import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'client/middlewares/logger';
import rootReducer from 'client/reducers';

let middlewares = [thunkMiddleware,loggerMiddleware];

if(typeof serverSide !== 'undefined' && serverSide === true){
	middlewares.push(require('client/middlewares/asyncBeApi'));
}else{
	middlewares.push(require('client/middlewares/asyncFeApi'));
}

const applyMiddlewareWrap = applyMiddleware.apply(this, middlewares);
const createStoreWithMiddleware = applyMiddlewareWrap(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept('client/reducers', () => {
			const nextRootReducer = require('client/reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}