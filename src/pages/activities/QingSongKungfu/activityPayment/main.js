import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import CreatePayActOrderCommand from './commands/CreatePayOrderCommand';
import CalculateActPriceCommand from './commands/CalculatePriceCommand';
import AvailableActCouponsCommand from './commands/AvailableCouponsCommand';
import OrderActCouponIdsCommand from './commands/OrderCouponIdsCommand';
import LoadUserAddress from './commands/LoadUserAddress';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(CreatePayActOrderCommand.commandName(), CreatePayActOrderCommand);
        this.registerCommand(CalculateActPriceCommand.commandName(), CalculateActPriceCommand);
        this.registerCommand(OrderActCouponIdsCommand.commandName(), OrderActCouponIdsCommand);
        this.registerCommand(AvailableActCouponsCommand.commandName(), AvailableActCouponsCommand);
        this.registerCommand(LoadUserAddress.commandName(), LoadUserAddress);
        this.route = 'user.activity.payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
