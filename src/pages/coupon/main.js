import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Tickets from '@/models/Tickets';
import TicketsService from '@/services/http/TicketsService';
import GetTicketsCommand from '@/commands/GetTicketsCommand';

const tickets = new Application(App, 'Tickets');
tickets.run(function(app) {
	app.registerModel('model.tickets', Tickets);
	app.registerCommand(GetTicketsCommand.commandName(), GetTicketsCommand);
    app.register('http.tickets',TicketsService);
},function(mountComponent) {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
 	return app;
});
