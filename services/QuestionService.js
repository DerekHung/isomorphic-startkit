import BaseService from 'services/BaseService';

class QuestionService extends BaseService {
	
	constructor() {
		super();
		this._restUrl = '/ajax/questions';
		this._apiUrl = '/services/profile';
		this._questionService = null;
	}
	
	getQuestions(params, callback) {
		let result = [];

		for (var id = 1; id < 11; id += 1) {
			let sampleContent = "page: "+params.page+" sample-"+id+": question content \""+id+"\"('@#$%^&*()_+')";
			let option = {
				id: id,
				content: sampleContent
			};
			
			result.push(option);
		};
		
		callback(result);
	}
	
	static getInstance() {
		if(!this._questionService){
			this._questionService = new this;
		}
		
		return this._questionService;
	}	
};

export default QuestionService;
