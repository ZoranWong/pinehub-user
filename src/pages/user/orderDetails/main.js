import App from './index';
import Vue from 'vue';
import OrderDetail from '@/models/OrderDetail';
import '../../../styles/iconfont.css'
import OrderDetailCommand from './commands/OrderDetailCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.order.detail', OrderDetail);
        this.registerCommand(OrderDetailCommand.commandName(), OrderDetailCommand);
        this.route = 'user.order.detail';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
