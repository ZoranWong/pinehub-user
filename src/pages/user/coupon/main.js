import App from './index';
import Vue from 'vue';
import LoadUserTicketsCommand from './commands/LoadUserTicketsCommand';
import LoadTicketDetailCommand from './commands/LoadTicketDetailCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(LoadUserTicketsCommand.commandName(), LoadUserTicketsCommand);
        this.registerCommand(LoadTicketDetailCommand.commandName(), LoadTicketDetailCommand);
        this.route = 'couponCenter';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
