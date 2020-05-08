import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import CreateGrouponOrder from "./commands/CreateGrouponOrder";
import GrouponAvailableCouponsCommand from "./commands/GrouponAvailableCouponsCommand";
import CalculateGrouponPriceCommand from "./commands/CalculateGrouponPriceCommand";
import GrouponCouponIdsCommand from "./commands/GrouponCouponIdsCommand";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.order.payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.registerCommand(CreateGrouponOrder.commandName(), CreateGrouponOrder);
        this.registerCommand(GrouponAvailableCouponsCommand.commandName(), GrouponAvailableCouponsCommand);
        this.registerCommand(CalculateGrouponPriceCommand.commandName(), CalculateGrouponPriceCommand);
        this.registerCommand(GrouponCouponIdsCommand.commandName(), GrouponCouponIdsCommand);
    });
}
