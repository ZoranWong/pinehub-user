import App from './index';
import Vue from 'vue';
import ActivityService from '@/services/http/ActivityService';
import SetUserMobileCommand from './commands/SetUserMobileCommand';
import GetActivityInfoCommand from '@/commands/GetActivityInfoCommand';
import LoadTicketsCommand from './commands/LoadTicketsCommand';
import ReceiveTicketCommand from './commands/ReceiveTicketCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.register('http.activity', ActivityService);
        this.registerCommand(GetActivityInfoCommand.commandName(), GetActivityInfoCommand);
        this.registerCommand(LoadTicketsCommand.commandName(), LoadTicketsCommand);
        this.registerCommand(ReceiveTicketCommand.commandName(), ReceiveTicketCommand);
        this.registerCommand(SetUserMobileCommand.commandName(), SetUserMobileCommand);
        this.route = 'index';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
