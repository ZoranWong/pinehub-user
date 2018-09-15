import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
const index = new Application(App, 'index');
index.run(function(mountComponent) {
	_.extend(App,mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});
