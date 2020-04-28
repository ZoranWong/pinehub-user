import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import LoadGrouponList from "./commands/LoadGrouponList";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.list';
    }, function () {
        this.registerCommand(LoadGrouponList.commandName(), LoadGrouponList);
        this.currentPage = new Vue(this.mountComponent);
    });
}
