import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import LoadShopDetails from "./commands/LoadShopDetails";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.shopDetails';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.registerCommand(LoadShopDetails.commandName(), LoadShopDetails);
    });
}
