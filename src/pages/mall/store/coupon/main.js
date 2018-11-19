import App from './index';
import Vue from 'vue';
import LoadBookingMallTicketsCommand from '../commands/LoadBookingMallTicketsCommand';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.registerCommand(LoadStoreTicketsCommand.commandName(), LoadStoreTicketsCommand);
	this.route = 'storeCoupon';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});