import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import LoadGrouponDetails from "./commands/LoadGrouponDetails";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.details';
    }, function () {
        this.registerCommand(LoadGrouponDetails.commandName(), LoadGrouponDetails);
        this.currentPage = new Vue(this.mountComponent);
    });
}
