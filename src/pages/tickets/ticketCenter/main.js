import App from './index';
import Vue from 'vue';
import LoadCanReceiveTicketsCommand from './commands/LoadCanReceiveTicketsCommand';
import ReceiveTicketsCommand from './commands/ReceiveTicketsCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'ticketCenter';
        this.registerCommand(LoadCanReceiveTicketsCommand.commandName(), LoadCanReceiveTicketsCommand);
        this.registerCommand(ReceiveTicketsCommand.commandName(), ReceiveTicketsCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
