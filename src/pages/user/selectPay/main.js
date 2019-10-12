import App from './index';
import Vue from 'vue';
import SelectPay from '../../../models/SelectPay';
import PaymentByBalanceCommand from './commands/PaymentByBalanceCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(PaymentByBalanceCommand.commandName(), PaymentByBalanceCommand);
        this.registerModel('model.user.pay', SelectPay);
        this.route = 'selectPay';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}

