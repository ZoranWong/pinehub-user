import App from './index';
import Vue from 'vue';
const application = wx.$app;
import SFShopListCommand from '../commands/SFShopListCommand';
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.selectShopByMap';
        this.registerCommand(SFShopListCommand.commandName(), SFShopListCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
