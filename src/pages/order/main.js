import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
const order = new Application(App, 'order');
order.run((app) => {
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});