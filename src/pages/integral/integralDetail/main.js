import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import LoadIntegralDetailCommand from './commands/LoadIntegralDetailCommand';
import IntegralDetail from '../../../models/IntegralDetail';
import ExchangeCouponCommand from '../integral/commands/ExchangeCouponCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.integral.detail', IntegralDetail);
        this.route = 'user.integral.detail';
        this.registerCommand(LoadIntegralDetailCommand.commandName(), LoadIntegralDetailCommand);
        this.registerCommand(ExchangeCouponCommand.commandName(), ExchangeCouponCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
