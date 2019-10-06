import App from './index';
import Vue from 'vue';
import OrderDetail from '@/models/OrderDetail';
import '../../../styles/iconfont.css'
import CreateOrderCommand from '../../../commands/CreateOrderCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.order.detail', OrderDetail);
        this.registerCommand(CreateOrderCommand.commandName(), CreateOrderCommand);
        this.route = 'user.order.detail';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
