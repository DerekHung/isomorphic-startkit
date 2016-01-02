import Express from 'express';
import QuestionService from 'services/QuestionService';
import UserService from 'services/UserService';

let routes = Express.Router();
const questionService = QuestionService.getInstance();
const userService = UserService.getInstance();

routes.get('/questions', (req, res) => {
	questionService.getQuestions(req.query, (result) => {
		res.status(200).send(result);
	});
});

routes.get('/profile', (req, res) => {
	userService.getUser(req.query, (result) => {
		res.status(200).send(result);
	});
});

export default routes;
