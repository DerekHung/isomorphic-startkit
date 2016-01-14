import * as ActionType from 'client/actions/demo';

function demoReducer (state = {}, action) {
	switch(action.type) {
		case ActionType.LOADED_DEMO:
			let result = action.response;
			return result;
			break;
			
		default:
			return state;
			break;
	}
}

export default demoReducer;