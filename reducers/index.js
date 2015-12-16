import { combineReducers } from 'redux';
import questions from 'reducers/questions';
import userData from 'reducers/userData';

const rootReducer = combineReducers({
	questions,
	userData
});

export default rootReducer;