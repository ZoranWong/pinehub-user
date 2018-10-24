import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';
import NearestStore from '@/models/NearestStore';
import StoreCategories from '@/models/StoreCategories';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import GetStoreCategoriesCommand from '@/commands/GetStoreCategoriesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import NearestStoreService from '@/services/http/NearestStoreService';
import StoreCategoriesService from '@/services/http/StoreCategoriesService';

const application = new Application(App, 'today.merchandises');
application.run(function(app) {
	if(app.models) {
		app.registerModel('model.today.merchandises', Merchandises);
		app.models.addModel('model.shoppingCarts', ShoppingCarts);
		app.models.addModel('model.nearestStore',NearestStore);
		app.models.addModel('model.storeCategories',StoreCategories);
	}

	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(GetStoreCategoriesCommand.commandName(),GetStoreCategoriesCommand);
    app.registerCommand(GetNearestStoreCommand.commandName(),GetNearestStoreCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(),EmptyMerchandisesCommand);

    app.register('http.storeCategories',StoreCategoriesService);
    app.register('http.nearestStore', NearestStoreService);

  
},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;

});
