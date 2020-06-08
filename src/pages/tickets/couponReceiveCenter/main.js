import App from './index';
import Vue from 'vue';
import CodeScanReceiveTicketsCommand from './commands/CodeScanReceiveTicketsCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {

        this.registerCommand(CodeScanReceiveTicketsCommand.commandName(), CodeScanReceiveTicketsCommand);

        this.route = 'couponReceiveCenter';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
