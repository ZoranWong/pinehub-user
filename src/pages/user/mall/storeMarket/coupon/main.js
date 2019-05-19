import App from './index';
import Vue from 'vue';
import LoadStoreTicketsCommand from '../commands/LoadStoreTicketsCommand';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerCommand(LoadStoreTicketsCommand.commandName(), LoadStoreTicketsCommand);
    this.route = 'storeCoupon';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
});
