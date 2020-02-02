import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import CreatePayOrderCommand from './commands/CreatePayOrderCommand';
import CalculatePriceCommand from './commands/CalculatePriceCommand';
import AvailableCouponsCommand from './commands/AvailableCouponsCommand';
import OrderCouponIdsCommand from './commands/OrderCouponIdsCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {

        this.registerCommand(CreatePayOrderCommand.commandName(), CreatePayOrderCommand);
        this.registerCommand(CalculatePriceCommand.commandName(), CalculatePriceCommand);
        this.registerCommand(OrderCouponIdsCommand.commandName(), OrderCouponIdsCommand);
        this.registerCommand(AvailableCouponsCommand.commandName(), AvailableCouponsCommand);
        this.route = 'user.order.payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
