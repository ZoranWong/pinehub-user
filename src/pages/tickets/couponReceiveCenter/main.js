import App from './index';
import Vue from 'vue';
import LoadCanReceiveTicketsCommand from './commands/LoadCanReceiveTicketsCommand';
import CodeScanReceiveTicketsCommand from './commands/CodeScanReceiveTicketsCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(LoadCanReceiveTicketsCommand.commandName(), LoadCanReceiveTicketsCommand);
        this.registerCommand(CodeScanReceiveTicketsCommand.commandName(), CodeScanReceiveTicketsCommand);

        this.route = 'couponReceiveCenter';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
