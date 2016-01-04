import BaseService from 'services/BaseService';

class UserService extends BaseService {
	
	constructor() {
		super();
		this._apiPath = '/profile';
		this._userService = null;
	}
	
	getUser(params, callback) {	
		this.get(params, (result) => {
			callback(result);	
		});
	}
	
	static getInstance() {
		if(!this._userService){
			this._userService = new this;
		}
		
		return this._userService;
	}	
};

export default UserService;
