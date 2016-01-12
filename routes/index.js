import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Demo from 'containers/demo';
import QuestionList from 'containers/questionList';
import User from 'containers/user';

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