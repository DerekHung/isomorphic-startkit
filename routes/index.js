import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Intro from 'containers/Intro';
import Question from 'containers/Question';
import UserDataPage from 'containers/UserDataPage';
import UserUpdatePage from 'containers/UserUpdatePage';

export default function(history) {
	return (
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Intro} />
				<Route path="/question/:questionId" component={Question} />
				<Route path="/user/:pid" component={UserDataPage} />
				<Route path="/user/update/:pid" component={UserUpdatePage} />
			</Route>
		</Router>
	);
};