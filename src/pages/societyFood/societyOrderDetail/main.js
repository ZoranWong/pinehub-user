import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
const application = wx.$app;
import SFOrderDetailCommand from '../commands/SFOrderDetailCommand';
import OrderStatusUpdateCommand from "../../orders/order/commands/OrderStatusUpdateCommand";
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.societyOrderDetail';
        this.registerCommand(SFOrderDetailCommand.commandName(), SFOrderDetailCommand);
        this.registerCommand(OrderStatusUpdateCommand.commandName(), OrderStatusUpdateCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
