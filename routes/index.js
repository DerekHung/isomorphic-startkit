import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Intro from 'containers/Intro';
import Question from 'containers/Question';

export default function(history) {
	return (
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Intro} />
				<Route path="/question/:questionId" component={Question} />
			</Route>
		</Router>
	);
};