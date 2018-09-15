import Vue from 'vue';
import Application from './Application';
import App from './App';
import _ from 'underscore';


const application = new Application(App);
application.run(function(mountComponent) {
	 // _.extend(App,mountComponent);
	 // const app = new Vue(App);
	 // app.$mount();
	 // return app;
});