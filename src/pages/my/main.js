import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import MyInfoService from '@/services/http/MyInfoService';
import MyInfoCommand from '@/commands/MyInfoCommand';
import MyInfo from "@/models/MyInfo";
const my = new Application(App, 'my');
my.run((app) => {
	app.models.addModel('model.my.info', MyInfo);
	app.register('http.myInfo', MyInfoService);
	app.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});