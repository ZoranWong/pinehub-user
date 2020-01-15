import App from './index';
import SubmitOrderFeedBackDataCommand from './commands/SubmitOrderFeedBackDataCommand';
import Vue from 'vue';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(SubmitOrderFeedBackDataCommand.commandName(), SubmitOrderFeedBackDataCommand);
        this.route = 'order.feedback'
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
