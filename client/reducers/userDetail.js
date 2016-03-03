import * as ActionType from 'client/actions/user';

function userDetailReducer (state = {data:{},template:{}}, action) {
	let result = null;

	switch(action.type) {
		case ActionType.LOADED_USER:
			let response = action.response;
			
			response[1] = response[1]||{};
			//results[1].expList = results[2]||[];
			//results[1].eduList = results[3]||[];
			
			return {
				data: response[1],
				template: response[0]
			};
			break;
			
		default:
			return state;
			break;
	}
}

export default userDetailReducer;