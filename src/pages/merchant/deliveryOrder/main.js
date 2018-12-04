import App from './index';
import Orders from '@/models/Orders';
import LoadDeliveryOrdersCommand from './commands/LoadDeliveryOrdersCommand';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('model.delivery.orders', Orders);
    this.registerCommand(LoadDeliveryOrdersCommand.commandName(), LoadDeliveryOrdersCommand);
    this.route = 'merchant.deliveryOrder'
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
