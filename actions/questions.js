import { CALL_API } from 'middleware/api';
import QuestionService from 'services/QuestionService';

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