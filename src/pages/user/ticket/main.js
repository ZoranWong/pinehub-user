import App from './index';
import Vue from 'vue';
// import ActivityService from '@/services/http/ActivityService';
// import SetUserMobileCommand from './commands/SetUserMobileCommand';
// import GetActivityInfoCommand from '@/commands/GetActivityInfoCommand';
import RegisterCommand from '../index/commands/RegisterCommand';
// import LoadTicketsCommand from './commands/LoadTicketsCommand';
// import ReceiveTicketCommand from '../index/commands/ReceiveTicketCommand';
console.log('RegisterCommand', RegisterCommand.commandName(), RegisterCommand);
// import Activity from '@/models/Activity';
const application = wx.$app;
application.setComponent(App).run(function() {
	// 	this.registerModel('model.activity', Activity);
	// 	this.register('http.activity', ActivityService);
	// 	this.registerCommand(GetActivityInfoCommand.commandName(), GetActivityInfoCommand);
	this.registerCommand(RegisterCommand.commandName(), RegisterCommand);
	// 	this.registerCommand(LoadTicketsCommand.commandName(), LoadTicketsCommand);
	// 	this.registerCommand(ReceiveTicketCommand.commandName(), ReceiveTicketCommand);
	// 	this.registerCommand(SetUserMobileCommand.commandName(), SetUserMobileCommand);
	this.route = 'ticket';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});
