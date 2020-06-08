import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import GetGrouponOrders from "./commands/GetGrouponOrders";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.myGroupon';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.registerCommand(GetGrouponOrders.commandName(), GetGrouponOrders);
    });
}
