import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import OrdersService from '../../../services/http/OrdersService';
import MyOrderCommand from '@/commands/MyOrderCommand';
import Orders from '@/models/Orders';

import OrderStatusUpdateCommand from '@/commands/OrderStatusUpdateCommand';
const application = wx.$app;
application.setComponent(App).run((app) => {
    app.registerModel('model.my.orders', Orders);
    app.register('http.orders', OrdersService);
    app.registerCommand(MyOrderCommand.commandName(), MyOrderCommand);

    app.registerCommand(OrderStatusUpdateCommand.commandName(), OrderStatusUpdateCommand);
}, (mountComponent) => {
    _.extend(App, mountComponent);
    let app = new Vue(App);
    app.$mount();
    return app;
});
