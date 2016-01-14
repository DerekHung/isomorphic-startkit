import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import apiMiddleware from 'client/middleware/api';
import loggerMiddleware from 'client/middleware/logger';
import rootReducer from 'client/reducers';

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	apiMiddleware,
	loggerMiddleware
)(createStore);

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