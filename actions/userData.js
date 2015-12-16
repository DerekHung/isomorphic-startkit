import { CALL_API } from 'middleware/api';

export const LOADED_USERDATE = 'LOADED_USERDATE';
export function loadUserData() {
	return {
		[CALL_API]: {
			method: 'get',
			url: 'http://localhost:3000/ajax/user',
			successType: LOADED_USERDATE
		}
	};
}