import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import apiMiddleware from '../middleware/api';
import loggerMiddleware from '../middleware/logger';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	apiMiddleware,
	loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}