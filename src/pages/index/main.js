import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';

import ActivityService from '@/services/http/ActivityService';
import GetActivityInfoCommand from '@/commands/GetActivityInfoCommand';
import Activity from "@/models/Activity";
const index = new Application(App, 'index');
index.run((app) => {
	app.registerModel('model.activity', Activity);
	app.register('http.activity', ActivityService);
	app.registerCommand(GetActivityInfoCommand.commandName(), GetActivityInfoCommand);
	console.log('this', app);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});