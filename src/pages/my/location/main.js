import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import MapService from '../../../services/mp/LocationSearchService';
import SearchLocation from '@/commands/SearchLocationCommand';

import MyNearbyStoresService from '@/services/http/MyNearbyStoresService';
import MyNearbyStoresCommand from '@/commands/MyNearbyStoresCommand';
import MyNearbyStores from "@/models/MyNearbyStores";
const storeLocation = new Application(App, 'store.location');
storeLocation.run((app) => {
	app.register('map', MapService);
	// console.log(app.instances['map']);
	app.registerCommand('search-location', SearchLocation);
	
	app.models.addModel('model.myNearbyStores', MyNearbyStores);
	console.log('app models', app.models);
	app.register('http.myNearbyStores', MyNearbyStoresService);
	app.registerCommand(MyNearbyStoresCommand.commandName(), MyNearbyStoresCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});