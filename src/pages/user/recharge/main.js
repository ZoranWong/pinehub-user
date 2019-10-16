import App from './index';
import Vue from 'vue';
import Recharge from '../../../models/Recharge';
import RechargeCardsCommand from './command/RechargeCardsCommand';
import CreateRechargeOrderCommand from './command/CreateRechargeOrderCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.recharge';
        this.registerModel('model.user.recharge', Recharge);
        this.registerCommand(RechargeCardsCommand.commandName(), RechargeCardsCommand);
        this.registerCommand(CreateRechargeOrderCommand.commandName(), CreateRechargeOrderCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
export default {
    config: {
        disableSwipeBack: true
    }
}
