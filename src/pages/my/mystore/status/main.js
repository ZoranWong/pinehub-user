import Vue from 'vue';
import App from './index';
import Application from '@/Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';

import MyStoreStatusPurchaseService from '@/services/http/MyStoreStatusPurchaseService';
import MyStoreStatusPurchaseCommand from '@/commands/MyStoreStatusPurchaseCommand';
import MyStoreStatusPurchase from "@/models/MyStoreStatusPurchase";


const myMystoreStatus = new Application(App, 'my.mystore.status');
myMystoreStatus.run((app) => {
	app.registerModel('myStore.merchandises', Merchandises);
	app.registerModel('store.categories', Categories);
	
	app.models.addModel('model.my.store.status.purchase', MyStoreStatusPurchase);
	app.register('http.myStoreStatusPurchase', MyStoreStatusPurchaseService);
	app.registerCommand(MyStoreStatusPurchaseCommand.commandName(), MyStoreStatusPurchaseCommand);
}, (component) => {
	_.extend(App, component);
	let app = new Vue(App);
	app.$mount();
	return app;
});