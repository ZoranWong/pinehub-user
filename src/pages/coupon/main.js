import App from './index';
import Vue from 'vue';
import Tickets from '@/models/Tickets';
import TicketsService from '@/services/http/TicketsService';
import GetTicketsCommand from '@/commands/GetTicketsCommand';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('model.tickets', Tickets);
    this.registerCommand(GetTicketsCommand.commandName(), GetTicketsCommand);
    this.register('http.tickets', TicketsService);
    this.route = 'coupon';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
