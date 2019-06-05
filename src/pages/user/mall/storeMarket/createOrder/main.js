import App from './index';
import Vue from 'vue';
import CreateStoreOrderCommand from '../commands/CreateStoreOrderCommand';
// 新命令
import LoadStoreTicketsCommand from '../commands/LoadStoreTicketsCommand';
import StoreShoppingCartLoadMerchandisesCommand from '../commands/StoreShoppingCartLoadMerchandisesCommand';
import StoreShoppingCartChangeMerchandiseCommand from '../commands/StoreShoppingCartChangeMerchandiseCommand';
import StoreShoppingCartClearMerchandisesCommand from '../commands/StoreShoppingCartClearMerchandisesCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function (app) {
        // 新命令注册
        this.registerCommand(LoadStoreTicketsCommand.commandName(), LoadStoreTicketsCommand);
        this.registerCommand(StoreShoppingCartLoadMerchandisesCommand.commandName(), StoreShoppingCartLoadMerchandisesCommand);
        this.registerCommand(StoreShoppingCartChangeMerchandiseCommand.commandName(), StoreShoppingCartChangeMerchandiseCommand);
        this.registerCommand(StoreShoppingCartClearMerchandisesCommand.commandName(), StoreShoppingCartClearMerchandisesCommand);
        this.registerCommand(CreateStoreOrderCommand.commandName(), CreateStoreOrderCommand);
        this.route = 'todaySubmitOrder';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
