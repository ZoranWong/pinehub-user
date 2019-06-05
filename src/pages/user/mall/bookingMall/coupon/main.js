import App from './index';
import Vue from 'vue';
import LoadBookingMallTicketsCommand from '../commands/LoadBookingMallTicketsCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(LoadBookingMallTicketsCommand.commandName(), LoadBookingMallTicketsCommand);
        this.route = 'activityCoupon';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
