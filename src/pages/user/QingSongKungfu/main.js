import App from './index';
import Vue from 'vue';
import '../../../styles/iconfont.css'
import QSKungfu from '../../../models/QSKungfu';
import LoadActBannerCommand from './commands/LoadActBannerCommand';
import LoadActProductsCommand from './commands/LoadActProductsCommand';
import AddGoodsToCart from './commands/AddGoodsToCart';
import LoadCartCommand from './commands/LoadCartCommand';
import ChangeBuyNumCommand from './commands/ChangeBuyNumCommand';
import ClearCartCommand from './commands/ClearCartCommand';
import SelectAddressCommand from './commands/SelectAddressCommand';
import LoadUserAddress from './commands/LoadUserAddress';
import LoadAllCatesCommand from './commands/LoadAllCatesCommand';
import LoadProductsInCatesCommand from './commands/LoadProductsInCatesCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.QSKungfu', QSKungfu);
        this.registerCommand(LoadActBannerCommand.commandName(), LoadActBannerCommand);
        this.registerCommand(LoadActProductsCommand.commandName(), LoadActProductsCommand);
        this.registerCommand(AddGoodsToCart.commandName(), AddGoodsToCart);
        this.registerCommand(LoadCartCommand.commandName(), LoadCartCommand);
        this.registerCommand(ChangeBuyNumCommand.commandName(), ChangeBuyNumCommand);
        this.registerCommand(ClearCartCommand.commandName(), ClearCartCommand);
        this.registerCommand(SelectAddressCommand.commandName(), SelectAddressCommand);
        this.registerCommand(LoadUserAddress.commandName(), LoadUserAddress);
        this.registerCommand(LoadAllCatesCommand.commandName(), LoadAllCatesCommand);
        this.registerCommand(LoadProductsInCatesCommand.commandName(), LoadProductsInCatesCommand);
        this.route = 'user.QingSongKungfu';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
