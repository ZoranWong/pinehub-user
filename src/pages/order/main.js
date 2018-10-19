import Vue from 'vue';
import App from './index';
import Application from '@/Application';
import _ from 'underscore';
const myShare = new Application(App, 'my.share');
myShare.run((app) => {}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});