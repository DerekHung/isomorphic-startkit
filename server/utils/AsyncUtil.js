import async from 'async';
import soap from 'soap';
import unirest from "unirest";
import I18NUtil from "server/utils/I18NUtil";

let esbUrl = 'http://esb.cloud.s104.com.tw/services';

function AsyncUtil() {
	let self = this;
	let soapMap = {};
	
	function _i18n(i18NFields){
		return function asyncI18nItem(asyncCallback){
			if(i18NFields){
				I18NUtil.getTranslate(i18NFields, (result) => {
					asyncCallback(null, result);
				});
			}else{
				asyncCallback(null, {});
			}
		};
	};
	
	function _rest(method, apiUrl, params, returnKey, restCallback){
		switch(arguments.length){
			case 3:
				if(typeof arguments[2] === 'function'){
					restCallback = arguments[2];
					params = {};
					returnKey = '';
				}else if(typeof arguments[2] === 'string'){
					returnKey = arguments[2];
					params = {};
					restCallback = null;
				}
				break;
				
			case 4:
				if(typeof arguments[3] === 'function'){
					restCallback = arguments[3];
					
					if(typeof arguments[2] === 'string'){
						returnKey = arguments[2];
						params = {};
					}
				}
				break;
		}
		
		return function asyncRestItem(asyncCallback){
			let main = function(mainCallback){
				let mainSelf = this;
				let source = /^http.+/.test(apiUrl)?apiUrl:(esbUrl+apiUrl);
				let request = unirest[method](source);
				
				mainSelf.mainCallback = mainCallback;
				
				switch(method){
					case 'post':
					case 'put':
						request.send(params);
						break;
					default:break;
				}
				
				request.end(function resultHandler(restResponse){
					let result = {};
					
					if(restResponse){
						result = restResponse.body;
					}
					
					if(returnKey && result.hasOwnProperty(returnKey)){
						result = result[returnKey];
					}
					
					if(restCallback){
						let newPool = restCallback(result);
							
						if(newPool && newPool.length > 0){					
							_childProcess(newPool, (newPoolResult) => {
								result.childResult = newPoolResult;
								mainSelf.mainCallback(null, result);
							});
						}else{
							mainSelf.mainCallback(null, result);
						}
					}else{
						mainSelf.mainCallback(null, result);
					}
				});
			};
			
			new main(asyncCallback);
		};
	};
	
	function _soap(apiUrl, soapCallback){		
		return function asyncSoapItem(asyncCallback){
			let main = function(mainCallback){
				let createMathod = function(soapClient, methodNameList){
					let wrap = {};
					
					methodNameList.map((methodName) => {
						wrap[methodName] = function(args, returnKey, methodCallback){
							if(typeof returnKey === 'function'){
								methodCallback = returnKey;
								returnKey = '';
							}
							
							soapClient[methodName](args, (clientError, clientResponce) => {
								let result = {};

								if(clientResponce){
									result = JSON.parse(clientResponce.return);
								}
								
								if(returnKey && result.hasOwnProperty(returnKey)){
									result = result[returnKey];
								}
								
								if(methodCallback){
									let newPool = methodCallback(result);
									
									if(newPool && newPool.length > 0){
										_childProcess(newPool, (newPoolResult) => {
											result.childResult = newPoolResult;
											mainCallback(null, result);
										});
									}else{
										mainCallback(null, result);
									}
								}else{
									mainCallback(null, result);
								}
							});
						};
					});

					return wrap;
				};
				
				if(!soapMap[apiUrl]){
					let source = esbUrl+apiUrl+"?wsdl";
					
					soap.createClient(source, function(soapError, soapClient){
						let key = apiUrl.replace(/\//,'');
						let methodNameList = Object.keys(soapClient[key][key+'HttpSoap11Endpoint']);
						
						soapMap[apiUrl] = {
							client : soapClient,
							methodNameList : methodNameList
						};
						
						let methodList = createMathod(soapClient, methodNameList);
						soapCallback(methodList);
					});
				}else{
					let soapClient = soapMap[apiUrl].client;
					let methodNameList = soapMap[apiUrl].methodNameList;
					let methodList = createMathod(soapClient, methodNameList);
					soapCallback(methodList);
				}
			};
			
			new main(asyncCallback);
		};
	}
	
	function _thrift(){
		return false;
	}
	
	function _childProcess(pool, callback){
		async.parallel(pool, function asyncFinalCallback(asyncError, asyncResults){
			if(asyncError){
				callback({error: asyncError});
			}else{
				callback(asyncResults);
			}
		});
	}
	
	self.need = function(apiType) {
		let returnFun = function(){
			let args = [];
			let pool = [];
			
			this.createNeed = function(){
				apiType = apiType || [];
				apiType.map((method) => {
					switch(method){
						case 'i18n':
							args.push(_i18n);
							break;
						case 'rest':
							args.push(_rest);
							break;
						case 'soap':
							args.push(_soap);
							break;
						case 'thrift':
							args.push(_thrift);
							break;
					}
				});
			};
			
			this.then = function(callback){
				pool = callback.apply(this, args);
				return this;
			};
			
			this.end = function(callback){
				async.parallel(pool, function asyncFinalCallback(asyncError, asyncResults){
					pool = [];

					if(asyncError){
						callback({error: asyncError});
					}else{
						callback(asyncResults);
					}
				});
			};
			
			this.createNeed();
		};
		
		return new returnFun();
	};
	
	self.getSoapMap = function(){
		return soapMap;
	};
};

export default new AsyncUtil();