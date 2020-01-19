import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import QSKungfu from '../../../models/QSKungfu';
import LoadActBannerCommand from './commands/LoadActBannerCommand';
import LoadActProductsCommand from './commands/LoadActProductsCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.QSKungfu', QSKungfu);
        this.registerCommand(LoadActBannerCommand.commandName(), LoadActBannerCommand);
        this.registerCommand(LoadActProductsCommand.commandName(), LoadActProductsCommand);
        this.route = 'user.QingSongKungfu';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
