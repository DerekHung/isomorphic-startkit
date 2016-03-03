import AsyncUtil from 'server/utils/AsyncUtil';

class DemoService {
	
	static getInstance() {
		if(!this.demoService){
			this.demoService = new this;
		}
		
		return this.demoService;
	}
	
	constructor() {
		this.demoService = null;
	}
	
	getDemo(params, callback) {
		AsyncUtil.need(['i18n', 'rest', 'soap']).then(function(i18n, rest, soap){
			return [
				rest('get', '/profile/' + params.pid, {}, 'result', (restResult) => {
					return [
						soap('/Experience.0.0', (client) => {
							client.queryAllExpData({'pid': restResult.pid, 'filter':'2', 'type':'0', 'source':'0'}, (soapExpResult) => {
								return [
									soap('/Education.0.0', (client) => {
										client.queryAllEduData({'pid': soapExpResult.currentResult[0].pid, 'filter':'2', 'type':'0', 'source':'0'});
									})
								];
							});
						})
					];
				}),
				rest('get', 'http://m.e104.com.tw/dev/_crab/api1.php', {}, 'result'),
				rest('get', 'http://m.e104.com.tw/dev/_crab/api2.php', {}, 'result')
			];
		}).end(function(results){
			callback({data:results[0]});
		});
	}
};

export default DemoService;
