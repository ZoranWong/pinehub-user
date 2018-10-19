import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
const submitOrder = new Application(App, 'submitOrder');
submitOrder.run((app) => {}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});