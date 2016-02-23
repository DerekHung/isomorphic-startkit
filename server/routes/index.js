import Express from 'express';
import ProfileService from 'server/services/ProfileService';
import DemoService from 'server/services/DemoService';

let routes = Express.Router();
const profileService = ProfileService.getInstance();
const demoService = DemoService.getInstance();

routes.get('/profile/list', (req, res) => {
	let paramMap = Object.assign({}, req.params, req.query);
	
	profileService.getList(paramMap, (result) => {
		res.status(200).send(result);
	});
});

routes.get('/profile/:pid', (req, res) => {
	let paramMap = Object.assign({}, req.params, req.query);
	
	profileService.getProfile(paramMap, (result) => {
		res.status(200).send(result);
	});
});

routes.get('/demo/:pid', (req, res) => {
	let paramMap = Object.assign({}, req.params, req.query);
	
	demoService.getDemo(paramMap, (result) => {
		res.status(200).send(result);
	});
});

export default routes;
