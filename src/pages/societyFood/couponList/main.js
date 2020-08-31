import App from './index';
import Vue from 'vue';
import SFShopDetailCommand from '../commands/SFShopDetailCommand';
import SFTomorrowShopListCommand from '../commands/SFTomorrowShopListCommand';
import SFClearCartCommand from '../commands/SFClearCartCommand';//清空购物车
const application = wx.$app;
import SFCanUseCouponsCommand from "../commands/SFCanUseCouponsCommand";
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.couponList';
        this.registerCommand(SFCanUseCouponsCommand.commandName(), SFCanUseCouponsCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
