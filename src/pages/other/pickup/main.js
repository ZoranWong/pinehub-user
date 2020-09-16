import App from './index';
import Vue from 'vue';
import Pickup from '../../../models/Pickup';
import LoadUserOrdersCommand from '../../orders/order/commands/LoadUserOrdersCommand';
import GetGrouponOrders from "../../activities/groupon/myGroupon/commands/GetGrouponOrders";
import SFMyListCommand from "../../societyFood/commands/SFMyListCommand";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.pickup';
        this.registerModel('model.user.pickup', Pickup);
        this.registerCommand(LoadUserOrdersCommand.commandName(), LoadUserOrdersCommand);
        this.registerCommand(GetGrouponOrders.commandName(), GetGrouponOrders);
        this.registerCommand(SFMyListCommand.commandName(), SFMyListCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
