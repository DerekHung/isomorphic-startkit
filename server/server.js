import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import Promise from 'bluebird';

import configureStore from 'client/store/configureStore';
import pageRoutes from 'client/routes/index';
import ajaxRoutes from 'client/routes/ajaxRoutes';

module.exports = function(app){
	app.use(compression());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true})); 
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '../public')));
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.set('port', 3000);

	// api route
	app.use(function(req, res, next){
		req.params.serverSide = true;
		req.query.serverSide = true;
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

				getReduxPromise().then(()=> {
					let sourceState = store.getState();
					let reduxState = JSON.stringify(sourceState);
					let html = ReactDOMServer.renderToString(
						<Provider store={store}>
							{ <RoutingContext {...renderProps} /> }
						</Provider>
					);

					if ( getCurrentUrl() === reqUrl ) {
						res.render('index', { html, reduxState });
					} else {
						res.redirect(302, getCurrentUrl());
					}
					
					unsubscribe();
				});
				
				function getReduxPromise () {
					let { query, params } = renderProps;
					let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
					
					params.serverSide = true;
					
					let promise = comp.fetchData ?
						comp.fetchData({ query, params, store, history }) :
						new Promise((resolve, reject) => {
							resolve();
						});

					return promise;
				}
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




