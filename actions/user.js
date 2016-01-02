import { CALL_API } from 'middleware/api';
import UserService from 'services/UserService';

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