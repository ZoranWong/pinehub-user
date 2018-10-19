import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';

const myFeedback = new Application(App, 'my.feedback');
myFeedback.run((app) => {
// src/pages/my/feedback/main.js
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});