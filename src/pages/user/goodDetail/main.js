import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import GoodDetailCommand from './commands/GoodDetailCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {

        this.registerCommand(GoodDetailCommand.commandName(), GoodDetailCommand);
        this.route = 'user.goodDetail';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
