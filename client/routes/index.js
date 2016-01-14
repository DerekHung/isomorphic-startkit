import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'client/containers/App';
import Demo from 'client/containers/demo';
import QuestionList from 'client/containers/questionList';
import User from 'client/containers/user';

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