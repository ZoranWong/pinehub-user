import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import Tickets from '@/models/Tickets';
import TicketsService from '@/services/http/TicketsService';
import GetTicketsCommand from '@/commands/GetTicketsCommand';

const application = wx.$app;
application.setComponent(App).run(function(app) {
	app.registerModel('model.tickets', Tickets);
	app.registerCommand(GetTicketsCommand.commandName(), GetTicketsCommand);
	app.register('http.tickets', TicketsService);
}, function(mountComponent) {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});