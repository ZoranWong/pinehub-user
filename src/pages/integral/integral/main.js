import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import Integral from '../../../models/Integral';
import LoadIntegralProductsCommand from './commands/LoadIntegralProductsCommand';
import ExchangeCouponCommand from './commands/ExchangeCouponCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.integral', Integral);
        this.registerCommand(LoadIntegralProductsCommand.commandName(), LoadIntegralProductsCommand);
        this.registerCommand(ExchangeCouponCommand.commandName(), ExchangeCouponCommand);
        this.route = 'user.integral';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
