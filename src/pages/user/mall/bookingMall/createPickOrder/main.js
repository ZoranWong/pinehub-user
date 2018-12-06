import App from './index';
import Vue from 'vue';
import LoadBookingMallTicketsCommand from '../commands/LoadBookingMallTicketsCommand';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerCommand(LoadBookingMallTicketsCommand.commandName(), LoadBookingMallTicketsCommand);
    this.route = 'orderSelf';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});


