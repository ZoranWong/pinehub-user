import App from './index';
import Vue from 'vue';
import GoodDetail from '../../../models/GoodDetail';
import '../../../styles/iconfont.css'
import GoodDetailCommand from './commands/GoodDetailCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.goodDetail', GoodDetail);
        this.registerCommand(GoodDetailCommand.commandName(), GoodDetailCommand);
        this.route = 'user.goodDetail';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
