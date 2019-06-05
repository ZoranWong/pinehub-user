import App from './index';
import Vue from 'vue';
import Orders from '@/models/Orders';
import LoadSummaryOrdersCommand from './commands/LoadSummaryOrdersCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.summary.orders', Orders);

        this.registerCommand(LoadSummaryOrdersCommand.commandName(), LoadSummaryOrdersCommand);
        this.route = 'merchant.orderSummary';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.currentPage.$mount();
    });
}
