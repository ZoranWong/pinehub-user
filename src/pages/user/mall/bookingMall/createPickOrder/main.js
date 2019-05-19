import App from './index';
import LoadBookingMallTicketsCommand from '../commands/LoadBookingMallTicketsCommand';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerCommand(LoadBookingMallTicketsCommand.commandName(), LoadBookingMallTicketsCommand);
    this.route = 'orderSelf';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
});


