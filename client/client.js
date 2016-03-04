import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import configureStore from 'client/store/configureStore';
import createRoutes from 'client/routes/index';

let reduxState;
if (window.__REDUX_STATE__) {
	try {
		reduxState = __REDUX_STATE__;
		__REDUX_STATE__ = {};
	} catch (e) {}
}

const store = configureStore(reduxState);

ReactDOM.render((
	<Provider store={store}>
		{ createRoutes(browserHistory) }
	</Provider>
), document.getElementById('root'));