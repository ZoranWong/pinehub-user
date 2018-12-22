import Vue from 'vue';
import App from './index';
import AlwaysUsedShoppingCarts from '@/models/AlwaysUsedShoppingCarts';
import LoadMerchantSavedShoppingCartsCommand from './commands/LoadMerchantSavedShoppingCartsCommand';
import CreateMerchantOrderCommand from './commands/CreateMerchantOrderCommand';
import ImportShoppingCartCommand from './commands/ImportShoppingCartCommand';
import PurchaseShoppingCartLoadMerchandisesCommand from '../commands/PurchaseShoppingCartLoadMerchandisesCommand';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.route = 'purchaseCreateOrder';
	this.registerModel('model.shoppingcart.always.use', AlwaysUsedShoppingCarts);
	this.registerCommand(LoadMerchantSavedShoppingCartsCommand.commandName(), LoadMerchantSavedShoppingCartsCommand);
	this.registerCommand(CreateMerchantOrderCommand.commandName(), CreateMerchantOrderCommand);
	this.registerCommand(ImportShoppingCartCommand.commandName(), ImportShoppingCartCommand);
	this.registerCommand(PurchaseShoppingCartLoadMerchandisesCommand.commandName(), PurchaseShoppingCartLoadMerchandisesCommand)
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});