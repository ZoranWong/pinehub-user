import App from './index';
import Vue from 'vue';
import LoadBalanceRecordCommand from './command/LoadBalanceRecordCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.balance';
        this.registerCommand(LoadBalanceRecordCommand.commandName(), LoadBalanceRecordCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
export default {
    config: {
        disableSwipeBack: true
    }
}
