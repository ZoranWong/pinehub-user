import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';
import NearbyStore from '@/models/NearbyStore';
import NearestStore from '@/models/NearestStore';
import NearestStoreService from '@/services/http/NearestStoreService';
// import Categories from '@/models/Categories';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';
// import GetCategoriesCommand from '@/commands/GetCategoriesCommand';

const application = new Application(App, 'actity.merchandises');
application.run(function(app) {
	if(app.models) {
		app.registerModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.shoppingCarts', ShoppingCarts);
		app.models.addModel('model.nearestStore',NearestStore);
		// app.models.addModel('model.categories', Categories);
	}
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(GetNearestStoreCommand.commandName(),GetNearestStoreCommand);

    app.register('http.nearestStore', NearestStoreService);
},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;

});
