import App from './index';
import Vue from 'vue';
import CreateOrderCommand from './commands/CreateOrderCommand';
import GetShopInfoCommand from './commands/GetShopInfoCommand';


const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(CreateOrderCommand.commandName(), CreateOrderCommand);
        this.registerCommand(GetShopInfoCommand.commandName(), GetShopInfoCommand);
        this.route = 'payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
