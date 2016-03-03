import { combineReducers } from 'redux';
import userList from 'client/reducers/userList';
import userDetail from 'client/reducers/userDetail';

const rootReducer = combineReducers({
	userList,
	userDetail
});

export default rootReducer;