import { combineReducers } from 'redux';
import demo from 'client/reducers/demo';
import questions from 'client/reducers/questions';
import user from 'client/reducers/user';

const rootReducer = combineReducers({
	demo,
	questions,
	user
});

export default rootReducer;