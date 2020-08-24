import App from './index';
import Vue from 'vue';
import SFShopListCommand from '../commands/SFShopListCommand';
import SFShopDetailCommand from '../commands/SFShopDetailCommand';
import SFTomorrowShopListCommand from '../commands/SFTomorrowShopListCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'societyFood.fastFoot';
        this.registerCommand(SFShopListCommand.commandName(), SFShopListCommand);
        this.registerCommand(SFShopDetailCommand.commandName(), SFShopDetailCommand);
        this.registerCommand(SFTomorrowShopListCommand.commandName(), SFTomorrowShopListCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
