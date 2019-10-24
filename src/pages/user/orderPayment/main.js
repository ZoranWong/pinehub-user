import App from './index';
import Vue from 'vue';
import OrderPayment from '@/models/OrderPayment';
import '../../../styles/iconfont.css'
import CreatePayOrderCommand from './commands/CreatePayOrderCommand';
import CalculatePriceCommand from './commands/CalculatePriceCommand';
import AvailableCouponsCommand from './commands/AvailableCouponsCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.order.payment', OrderPayment);
        this.registerCommand(CreatePayOrderCommand.commandName(), CreatePayOrderCommand);
        this.registerCommand(CalculatePriceCommand.commandName(), CalculatePriceCommand);
        this.registerCommand(AvailableCouponsCommand.commandName(), AvailableCouponsCommand);
        this.route = 'user.order.payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
