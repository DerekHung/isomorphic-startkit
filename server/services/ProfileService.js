import AsyncUtil from 'server/utils/AsyncUtil';

class ProfileService {
	
	static getInstance() {
		if(!this.profileService){
			this.profileService = new this;
		}
		
		return this.profileService;
	}
	
	constructor() {
		this.profileService = null;
	}
	
	getProfile(params, callback) {
		AsyncUtil.need(['i18n', 'rest']).then(function(i18n, rest){
			return [
				i18n(['profileTitle', 'userName', 'userSex', 'userEmail']),
				rest('get', 'http://10.102.5.108:4080/profile/' + params.pid, 'result'),
				rest('get', 'http://10.102.5.108:4080/profile/' + params.pid + '/exp', 'result'),
				rest('get', 'http://10.102.5.108:4080/profile/' + params.pid + '/edu', 'result')
			];
		}).end((result) => {
			callback(result);
		});
	}
	
	getList(params, callback) {
		AsyncUtil.need(['i18n', 'rest']).then(function(i18n, rest){
			return [
				i18n(['profileTitle', 'userName', 'userSex', 'userEmail']),
				rest('get', 'http://10.102.5.108:4080/profile', 'result')
			];
		}).end((result) => {
			callback(result);
		});
	}
};

export default ProfileService;
