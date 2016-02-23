export const LOADED_USERLIST = 'LOADED_USERLIST';
export function loadUserList(params) {
	return {
		'CALL_API': {
			type: LOADED_USERLIST,
			method: 'get',
			target: '/profile/list',
			params: params
		}
	};
};

export const LOADED_USER = 'LOADED_USER';
export function loadUser(params) {
	return {
		'CALL_API': {
			type: LOADED_USER,
			method: 'get',
			target: '/profile/:pid',
			params: params
		}
	};
};

export const ADDED_USER = 'ADDED_USER';
export function addUser(params) {
	return {
		'CALL_API': {
			type: ADDED_USER,
			fe: (resolve)=>{
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				})
			},
			be: (resolve) => {
				profileService.getProfile(params, (result) => {
					resolve(result);
				});
			}
		}
	};
};

export const UPDATED_USER = 'UPDATED_USER';
export function updateUser(params) {
	return {
		'CALL_API': {
			type: UPDATED_USER,
			fe: (resolve)=>{
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				})
			},
			be: (resolve) => {
				profileService.getProfile(params, (result) => {
					resolve(result);
				});
			}
		}
	};
};

export const DELETED_USER = 'DELETED_USER';
export function deleteUser(params) {
	return {
		'CALL_API': {
			type: DELETED_USER,
			fe: (resolve)=>{
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				})
			},
			be: (resolve) => {
				profileService.getProfile(params, (result) => {
					resolve(result);
				});
			}
		}
	};
};

export const DELETED_MULTIUSER = 'DELETED_MULTIUSER';
export function deleteMultiUser(params) {
	return {
		'CALL_API': {
			type: DELETED_MULTIUSER,
			fe: (resolve)=>{
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				})
			},
			be: (resolve) => {
				profileService.getProfile(params, (result) => {
					resolve(result);
				});
			}
		}
	};
};