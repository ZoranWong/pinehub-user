import App from './index';
import Vue from 'vue';
import Categories from '@/models/Categories';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';

import StoreShoppingCartLoadMerchandisesCommand from './commands/StoreShoppingCartLoadMerchandisesCommand';
import StoreShoppingCartChangeMerchandiseCommand from './commands/StoreShoppingCartChangeMerchandiseCommand';
import LoadStoreCategoriesCommand from './commands/LoadStoreCategoriesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';
import StoreShoppingCartClearMerchandisesCommand from './commands/StoreShoppingCartClearMerchandisesCommand';

const application = wx.$app;

application.setComponent(App).run(function () {
    this.registerModel('model.storeMarket.categories', Categories);
    this.registerModel('model.storeMarket.merchandises', Merchandises);

    this.registerCommand(GetNearestStoreCommand.commandName(), GetNearestStoreCommand);
    this.registerCommand(LoadStoreCategoriesCommand.commandName(), LoadStoreCategoriesCommand);
    this.registerCommand(StoreShoppingCartLoadMerchandisesCommand.commandName(), StoreShoppingCartLoadMerchandisesCommand);
    this.registerCommand(StoreShoppingCartChangeMerchandiseCommand.commandName(), StoreShoppingCartChangeMerchandiseCommand);
    this.registerCommand(StoreShoppingCartClearMerchandisesCommand.commandName(), StoreShoppingCartClearMerchandisesCommand);
    this.route = 'storeMarket';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
