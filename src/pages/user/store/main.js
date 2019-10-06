import App from './index';
import Vue from 'vue';
import Store from '../../../models/Store';
import LoadStoreGoodsCommand from './commands/LoadStoreGoodsCommand';
import LoadStoreGoodsCategories from './commands/LoadStoreGoodsCategories';
import '../../../styles/iconfont.css'
import AddGoodsToCart from './commands/AddGoodsToCart';
import LoadCartCommand from './commands/LoadCartCommand';
import ClearCartCommand from './commands/ClearCartCommand';
import ChangeBuyNumCommand from './commands/ChangeBuyNumCommand';
const application = wx.$app;

console.log(application, 'app');
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.store', Store);
        this.registerCommand(LoadStoreGoodsCommand.commandName(), LoadStoreGoodsCommand);
        this.registerCommand(AddGoodsToCart.commandName(), AddGoodsToCart);
        this.registerCommand(LoadCartCommand.commandName(), LoadCartCommand);
        this.registerCommand(ClearCartCommand.commandName(), ClearCartCommand);
        this.registerCommand(ChangeBuyNumCommand.commandName(), ChangeBuyNumCommand);
        this.registerCommand(LoadStoreGoodsCategories.commandName(), LoadStoreGoodsCategories);
        this.route = 'user.store';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
