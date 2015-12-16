import createLogger from 'redux-logger';

const logger = createLogger({
	level: 'info',
	collapsed: false,
	logger: console,
	predicate: (getState, action) => true
});

export default logger;