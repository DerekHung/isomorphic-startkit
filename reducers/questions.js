import * as ActionType from 'actions/questions';

function questionsReducer (state = [], action) {
	switch(action.type) {
		case ActionType.LOADED_QUESTIONS:
			let result = action.response || state;
			return result;
			break;
			
		default:
			return state;
			break;
	}
}

export default questionsReducer;