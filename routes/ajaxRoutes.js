import Express from 'express';

let routes = Express.Router();

routes.get('/questions', (req, res) => {
	let { questions } = require('./mock_api');
	res.status(200).send(questions);
});

export default routes;
