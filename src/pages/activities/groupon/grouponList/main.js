import App from './index';
import Vue from 'vue';
import '../../../../styles/iconfont.css'
import LoadGrouponList from "./commands/LoadGrouponList";
import ClickGroupon from "./commands/ClickGroupon";
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.groupon.list';
    }, function () {
        this.registerCommand(LoadGrouponList.commandName(), LoadGrouponList);
        this.registerCommand(ClickGroupon.commandName(), ClickGroupon);
        this.currentPage = new Vue(this.mountComponent);
    });
}
