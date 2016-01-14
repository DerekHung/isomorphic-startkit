import * as ActionType from 'client/actions/user';

function userReducer (state = {}, action) {
	switch(action.type) {
		case ActionType.LOADED_USER:
			let result = action.response;
			return result;
			break;
			
		default:
			return state;
			break;
	}
}

export default userReducer;