import App from './index';
import Vue from 'vue';
import LoadUserTicketsCommand from './commands/LoadUserTicketsCommand';

const application = wx.$app;
application.setComponent(App).run(function() {
	console.log('commandName ======= =======', LoadUserTicketsCommand.commandName);
	this.registerCommand(LoadUserTicketsCommand.commandName(), LoadUserTicketsCommand);
	this.route = 'coupon';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});
