import App from './index';
import SelfextraOrderService from '../../../../services/http/SelfextraOrderService';
import SelfextraOrderCommand from '@/commands/SelfextraOrderCommand';
import SelfextraOrders from '@/models/SelfextraOrders';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function (app) {
    this.models.addModel('model.extra.orders', SelfextraOrders);
    this.register('http.selfextraOrder', SelfextraOrderService);
    this.registerCommand(SelfextraOrderCommand.commandName(), SelfextraOrderCommand);
    this.route = 'myStorePickedUpOrder';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
