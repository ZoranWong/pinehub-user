import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import GetGrouponOrderDetails from "./commands/GetGrouponOrderDetails";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.order.payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.registerCommand(GetGrouponOrderDetails.commandName(), GetGrouponOrderDetails);
    });
}
