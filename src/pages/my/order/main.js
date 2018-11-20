import App from './index';
import OrdersService from '../../../services/http/OrdersService';
import MyOrderCommand from '@/commands/MyOrderCommand';
import Orders from '@/models/Orders';

import OrderStatusUpdateCommand from '@/commands/OrderStatusUpdateCommand';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('model.my.orders', Orders);
    this.register('http.orders', OrdersService);
    this.registerCommand(MyOrderCommand.commandName(), MyOrderCommand);
    this.registerCommand(OrderStatusUpdateCommand.commandName(), OrderStatusUpdateCommand);
    this.route = 'myOrder';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
