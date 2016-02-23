import * as ActionType from 'client/actions/user';

function userListReducer (state = {data:[],template:{}}, action) {
	let result = null;

	switch(action.type) {
		case ActionType.LOADED_USERLIST:
			let response = action.response;
			
			response[1].map(function(item){
				item.isChecked = false;
			});

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

export default userListReducer;