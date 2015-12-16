import * as ActionType from 'actions/userData';

function userDataReducer (state = {}, action) {
	switch(action.type) {
		case ActionType.LOADED_USERDATE:
			let result = action.response || state;
			return result;
			break;
			
		default:
			return state;
			break;
	}
}

export default userDataReducer;