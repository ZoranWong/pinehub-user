import Vue from 'vue';
import App from './index';
import Application from '../../../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';
const myMystoreStatus = new Application(App, 'my.mystore.status');
myMystoreStatus.run((app) => {
	app.models.addModel('myStore.merchandises', Merchandises);
	app.models.addModel('store.categories',Categories)
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});