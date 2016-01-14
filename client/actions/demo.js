export const LOADED_DEMO = 'LOADED_DEMO';
export function loadDemo(params) {
	return { type: LOADED_DEMO, response: params };
}