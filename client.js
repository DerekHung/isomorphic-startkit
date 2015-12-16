import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';

let reduxState;
if (window.__REDUX_STATE__) {
  try {
    reduxState = JSON.parse(unescape(__REDUX_STATE__));
  } catch (e) {}
}

const store = configureStore(reduxState);
const history = createBrowserHistory();

ReactDOM.render((
	<Provider store={store}>
		{ createRoutes(history) }
	</Provider>
), document.getElementById('root'));