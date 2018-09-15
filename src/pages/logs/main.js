import Vue from 'vue';
<<<<<<< HEAD
import Application from '../../Application';
import App from './index';
import _ from 'underscore';
const application = new Application(App);
application.run(function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;
=======
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
const log = new Application(App, 'log');
log.run(function(mountComponent) {
	_.extend(App,mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
>>>>>>> 07130b95d588a260b3f4d6dc361f14673c6ddd7b
});
