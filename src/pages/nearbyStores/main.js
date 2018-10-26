import Vue from 'vue';
import App from './index';
import Application from '@/Application';
import _ from 'underscore';
import SearchLocation from '@/commands/SearchLocationCommand';

import NearbyStoresService from '@/services/http/NearbyStoresService';
import GetNearbyStoresCommand from '@/commands/GetNearbyStoresCommand';
import NearbyStores from "@/models/NearbyStores";
const storeLocation = new Application(App, 'nearby.stores');
storeLocation.run((app) => {
	// console.log(app.instances['map']);
	app.registerCommand('search-location', SearchLocation);

	app.models.addModel('model.nearbyStores', NearbyStores);
	console.log('app models', app.models);
	app.register('http.nearbyStores', NearbyStoresService);
	app.registerCommand(GetNearbyStoresCommand.commandName(), GetNearbyStoresCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});
