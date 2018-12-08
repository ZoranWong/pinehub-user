import App from './index';
import Categories from '@/models/Categories';
import Merchandises from '@/models/Merchandises';
import LoadPurchaseCategoriesCommand from './commands/LoadPurchaseCategoriesCommand';
import LoadPurchaseMerchandisesCommand from './commands/LoadPurchaseMerchandisesCommand';
import PurchaseShoppingCartClearMerchandisesCommand from './commands/PurchaseShoppingCartClearMerchandisesCommand';
import PurchaseShoppingCartChangeMerchandiseCommand from './commands/PurchaseShoppingCartChangeMerchandiseCommand';
import PurchaseShoppingCartLoadMerchandisesCommand from './commands/PurchaseShoppingCartLoadMerchandisesCommand';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.registerModel('model.purchase.categories', Categories);
	this.registerModel('model.purchase.merchandises', Merchandises);

	this.registerCommand(PurchaseShoppingCartClearMerchandisesCommand.commandName(), PurchaseShoppingCartClearMerchandisesCommand)
	this.registerCommand(PurchaseShoppingCartChangeMerchandiseCommand.commandName(), PurchaseShoppingCartChangeMerchandiseCommand)
	this.registerCommand(PurchaseShoppingCartLoadMerchandisesCommand.commandName(), PurchaseShoppingCartLoadMerchandisesCommand)

	this.registerCommand(LoadPurchaseMerchandisesCommand.commandName(), LoadPurchaseMerchandisesCommand)
	this.registerCommand(LoadPurchaseCategoriesCommand.commandName(), LoadPurchaseCategoriesCommand);
	this.route = 'merchant.purchase'
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});