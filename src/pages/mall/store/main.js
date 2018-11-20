import App from './index';
import Vue from 'vue';
import StoreCategories from '@/models/Categories';
import StoreShoppingCartLoadMerchandisesCommand from './commands/StoreShoppingCartLoadMerchandisesCommand';
import StoreShoppingCartChangeMerchandiseCommand from './commands/StoreShoppingCartChangeMerchandiseCommand';
import LoadStoreCategoriesCommand from './commands/LoadStoreCategoriesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';
import StoreShoppingCartClearMerchandisesCommand from './commands/StoreShoppingCartClearMerchandisesCommand';
import NearestStoreService from '@/services/http/NearestStoreService';

const application = wx.$app;

application.setComponent(App).run(function () {

    this.models.addModel('model.storeCategories', StoreCategories);

    this.registerCommand(GetNearestStoreCommand.commandName(), GetNearestStoreCommand);
    this.registerCommand(LoadStoreCategoriesCommand.commandName(), LoadStoreCategoriesCommand);
    this.registerCommand(StoreShoppingCartLoadMerchandisesCommand.commandName(), StoreShoppingCartLoadMerchandisesCommand);
    this.registerCommand(StoreShoppingCartChangeMerchandiseCommand.commandName(), StoreShoppingCartChangeMerchandiseCommand);
    this.registerCommand(StoreShoppingCartClearMerchandisesCommand.commandName(), StoreShoppingCartClearMerchandisesCommand);
    this.register('http.nearestStore', NearestStoreService);
    this.route = 'todayOrder';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
