import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';
import Categories from '@/models/Categories';
import NearestStore from '@/models/NearestStore';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import GetCategoriesCommand from '@/commands/GetCategoriesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';

import CategoriesService from '@/services/http/CategoriesService';
import NearestStoreService from '@/services/http/NearestStoreService';

const application = new Application(App, 'actity.merchandises');
application.run(function(app) {

	if(app.models) {
		app.models.addModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.shoppingCarts', ShoppingCarts);
		app.models.addModel('model.categories', Categories);
		app.models.addModel('model.nearestStore',NearestStore)
	}	
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(),ReduceMerchandiseCommand);
    app.registerCommand(GetCategoriesCommand.commandName(),GetCategoriesCommand);
    app.registerCommand(GetNearestStoreCommand.commandName(),GetNearestStoreCommand);

    app.register('http.categories',CategoriesService);
    app.register('http.nearestStore', NearestStoreService);

},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;
});


