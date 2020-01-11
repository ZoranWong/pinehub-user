import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import AddressOperation from '../../../models/AddressOperation';
import LoadIntegralProductsCommand from './commands/LoadIntegralProductsCommand';
import ExchangeCouponCommand from './commands/ExchangeCouponCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.addressOperation', AddressOperation);
        // this.registerCommand(LoadIntegralProductsCommand.commandName(), LoadIntegralProductsCommand);
        // this.registerCommand(ExchangeCouponCommand.commandName(), ExchangeCouponCommand);
        this.route = 'user.addressOperation';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
