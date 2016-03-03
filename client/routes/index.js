import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'client/containers/App';
import Demo from 'client/containers/demo';
import UserList from 'client/containers/userList';
import userDetail from 'client/containers/userDetail';

export default function(history) {
	return (
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Demo} />
				<Route path="/user/list" component={UserList} />
				<Route path="/user/:pid" component={userDetail} />
			</Route>
		</Router>
	);
};