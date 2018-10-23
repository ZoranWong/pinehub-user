import Vue from 'vue';
import App from './index';
import Application from '@/Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';
const myMystoreStatus = new Application(App, 'my.mystore.status');
myMystoreStatus.run((app) => {
	app.registerModel('myStore.merchandises', Merchandises);
	app.registerModel('store.categories', Categories);
}, (component) => {
	_.extend(App, component);
	let app = new Vue(App);
	app.$mount();
	return app;
});