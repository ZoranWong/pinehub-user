import App from './index';
import Vue from 'vue';
import Merchandises from '@/models/Merchandises';
import NearestStore from '@/models/NearestStore';
import StoreCategories from '@/models/Categories';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import StoreShoppingCartLoadMerchandisesCommand from '@/commands/StoreShoppingCartLoadMerchandisesCommand';
import StoreShoppingCartChangeMerchandiseCommand from '@/commands/StoreShoppingCartChangeMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';
import GetStoreCategoriesCommand from '@/commands/GetStoreCategoriesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';

import NearestStoreService from '@/services/http/NearestStoreService';
import CategoriesService from '@/services/http/CategoriesService';

const application = wx.$app;

application.setComponent(App).run(function() {
	this.models.addModel('model.store.merchandises', Merchandises);
	this.models.addModel('model.nearestStore', NearestStore);
	this.models.addModel('model.storeCategories', StoreCategories);

	this.registerCommand(GetNearestStoreCommand.commandName(), GetNearestStoreCommand);
	this.registerCommand(GetStoreCategoriesCommand.commandName(), GetStoreCategoriesCommand);

	this.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
	this.registerCommand(StoreShoppingCartLoadMerchandisesCommand.commandName(), StoreShoppingCartLoadMerchandisesCommand);
	this.registerCommand(StoreShoppingCartChangeMerchandiseCommand.commandName(), StoreShoppingCartChangeMerchandiseCommand);
	this.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

	this.registerCommand(ClearMerchandiseCommand.commandName(), ClearMerchandiseCommand);
	this.register('http.nearestStore', NearestStoreService);
	this.register('http.categories', CategoriesService);
	this.route = 'todayOrder';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});