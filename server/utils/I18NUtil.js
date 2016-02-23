import i18n from "i18n";

class I18NService {
	
	static getTranslate (params, callback) {
		let results = {};
		params = params || [];
		
		params.map((key) => {
			results[key] = i18n.__(key) || '';
		});
		
		callback(results);
	}	
};

export default I18NService;
