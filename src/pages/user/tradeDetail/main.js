import App from './index';
import Vue from 'vue';
import LoadTradeOrderItemsCommand from './commands/LoadTradeOrderItemsCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(LoadTradeOrderItemsCommand.commandName(), LoadTradeOrderItemsCommand);
        this.route = 'user.tradeDetail';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
export default {
    config: {
        disableSwipeBack: true
    }
}
