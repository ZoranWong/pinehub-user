import App from './index';
import Vue from 'vue';
import LoadUserOrdersCommand from './commands/LoadUserOrdersCommand';
import Orders from '@/models/Orders';
import OrderStatusUpdateCommand from './commands/OrderStatusUpdateCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.orders', Orders);
        this.registerCommand(LoadUserOrdersCommand.commandName(), LoadUserOrdersCommand);
        this.registerCommand(OrderStatusUpdateCommand.commandName(), OrderStatusUpdateCommand);
        this.route = 'user.orders';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });

}
