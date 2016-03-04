import express from 'express';
import i18n from "i18n";
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import Promise from 'bluebird';

import configureStore from 'client/store/configureStore';
import pageRoutes from 'client/routes';
import ajaxRoutes from 'server/routes';

module.exports = function(app){

	i18n.configure({
		locales: ['cht', 'en'],
		defaultLocale: 'cht',
		cookie: 'locale',
		directory: path.join(__dirname, 'locales')
	});
	
	app.use(compression());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true})); 
	app.use(cookieParser());
	app.use(i18n.init);
	app.use(express.static(path.join(__dirname, '../public')));
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.set('port', 3000);

	// api route
	app.use(function(req, res, next){
		req.params.serverSide = true;
		req.query.serverSide = true;
		
		var locale = 'cht';
		var cookie = req.cookies.locale;
		if (cookie === undefined){
			res.cookie('locale',locale, { maxAge: 900000, httpOnly: true });
		}
		
		next();
	});
	app.use('/ajax', ajaxRoutes);

	// page route
	app.use((req, res, next) => {
		let history = createMemoryHistory();
		let routes = pageRoutes(history);
		let location = createLocation(req.url);
		let store = configureStore();

		match({ routes, location }, (error, redirectLocation, renderProps) => {
			if (redirectLocation) {
				res.redirect(301, redirectLocation.pathname + redirectLocation.search)
			} else if (error) {
				res.status(500).send(error.message);
			} else if (renderProps == null) {
				res.status(404).send('Not found');
			} else {
				let [ getCurrentUrl, unsubscribe ] = subscribeUrl();
				let reqUrl = location.pathname + location.search;

				function completeStore(){
					let sourceState = store.getState();
					let reduxState = JSON.stringify(sourceState);
					
					let html = ReactDOMServer.renderToString(
						<Provider store={store}>
							{ <RouterContext {...renderProps} /> }
						</Provider>
					);

					if ( getCurrentUrl() === reqUrl ) {
						res.render('index', { html, reduxState });
					} else {
						res.redirect(302, getCurrentUrl());
					}
					
					unsubscribe();
				}				
				
				function getReduxPromise () {
					let { query, params } = renderProps;
					let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
					
					let promise = comp.fetchData ?
						comp.fetchData({ query, params, store, history }) :
						new Promise((resolve, reject) => {
							resolve();
						});

					return promise;
				}
				
			
				getReduxPromise().then(completeStore);
			}
		});

		function subscribeUrl () {
			let currentUrl = location.pathname + location.search;
			let unsubscribe = history.listen((newLoc)=> {
				if (newLoc.action === 'PUSH') {
					currentUrl = newLoc.pathname + newLoc.search;
				}
			});
			
			return [
				() => currentUrl,
				unsubscribe
			];
		}
	});
};