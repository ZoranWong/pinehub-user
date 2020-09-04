import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import SFCanUseCouponsCommand from "../commands/SFCanUseCouponsCommand";
import SFOrderDetailCommand from "../commands/SFOrderDetailCommand";
import SFSubmitOrderCommand from "../commands/SFSubmitOrderCommand";
import SFCartAmountCommand from "../commands/SFCartAmountCommand";
import SFUserGoodsAddressCommand from "../commands/SFUserGoodsAddressCommand";
import CreatePayOrderCommand from "../../orders/orderPayment/commands/CreatePayOrderCommand";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.societyOrderSubmit';
        this.registerCommand(SFCanUseCouponsCommand.commandName(), SFCanUseCouponsCommand);
        this.registerCommand(SFOrderDetailCommand.commandName(), SFOrderDetailCommand);
        this.registerCommand(SFSubmitOrderCommand.commandName(), SFSubmitOrderCommand);
        this.registerCommand(SFCartAmountCommand.commandName(), SFCartAmountCommand);
        this.registerCommand(SFUserGoodsAddressCommand.commandName(), SFUserGoodsAddressCommand);
        this.registerCommand(CreatePayOrderCommand.commandName(), CreatePayOrderCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
