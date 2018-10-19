import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import MapService from '../../../services/mp/LocationSearchService';
import SearchLocation from '@/commands/SearchLocationCommand';
const storeLocation = new Application(App, 'store.location');
storeLocation.run((app) => {
	app.register('map', MapService);
	console.log(app.instances['map']);
	app.registerCommand('search-location', SearchLocation);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});