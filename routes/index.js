import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Demo from 'containers/Demo';
import QuestionList from 'containers/QuestionList';
import User from 'containers/User';

export default function(history) {
	return (
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Demo} />
				<Route path="/questions/page/:page" component={QuestionList} />
				<Route path="/:pid" component={User} />
			</Route>
		</Router>
	);
};