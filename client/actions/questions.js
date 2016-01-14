import { CALL_API } from 'client/middleware/api';
import QuestionService from 'client/services/QuestionService';

const questionService = QuestionService.getInstance();

export const LOADED_QUESTIONS = 'LOADED_QUESTIONS';
export function loadQuestions(params) {
	return {
		[CALL_API]: (resolve) => {
			questionService.getQuestions(params, (result) => {
				resolve(LOADED_QUESTIONS, result);
			});
		}
	};
}