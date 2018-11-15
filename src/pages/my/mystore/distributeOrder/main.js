import App from './index';
import DistributeOrderService from '../../../../services/http/DistributeOrderService';
import DistributeOrderCommand from '@/commands/DistributeOrderCommand';
import DistributeOrder from '@/models/DistributeOrder';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(() => {
    this.registerModel('model.distribute.orders', DistributeOrder);
    this.register('http.distributeOrder', DistributeOrderService);
    this.registerCommand(DistributeOrderCommand.commandName(), DistributeOrderCommand);
    this.route = 'myStoreDistributeOrder'
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
