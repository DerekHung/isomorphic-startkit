import { CALL_API } from 'middleware/api';

export const LOADED_QUESTIONS = 'LOADED_QUESTIONS';

export function loadQuestions(params) {
	return {
		[CALL_API]: {
			method: 'get',
			url: '/ajax/questions',
			params: params,
			successType: LOADED_QUESTIONS
		}
	};
}