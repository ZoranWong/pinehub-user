import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
const my = new Application(App, 'my');
my.run((app) => {
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});