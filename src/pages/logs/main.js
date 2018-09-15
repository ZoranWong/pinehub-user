import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
const log = new Application(App, 'log');
log.run(function(mountComponent) {
	_.extend(App,mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});
