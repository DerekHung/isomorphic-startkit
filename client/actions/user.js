import { CALL_API } from 'client/middleware/api';
import UserService from 'client/services/UserService';

const userService = UserService.getInstance();

export const LOADED_USER = 'LOADED_USER';
export function loadUser(params) {
	return {
		[CALL_API]: (resolve) => {
			userService.getUser(params, (result) => {
				resolve(LOADED_USER, result);
			});
		}
	};
}