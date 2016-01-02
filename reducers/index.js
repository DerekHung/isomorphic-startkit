import { combineReducers } from 'redux';
import demo from 'reducers/demo';
import questions from 'reducers/questions';
import user from 'reducers/user';

const rootReducer = combineReducers({
	demo,
	questions,
	user
});

export default rootReducer;