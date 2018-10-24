import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';
import Categories from '@/models/Categories';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import GetCategoriesCommand from '@/commands/GetCategoriesCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import CategoriesService from '@/services/http/CategoriesService';

const application = new Application(App, 'shop.merchandises');
application.run(function(app) {

	if(app.models) {
		app.models.addModel('model.reserveShop.merchandises', Merchandises);
		app.models.addModel('model.shoppingCarts', ShoppingCarts);
		app.models.addModel('model.categories', Categories);
		
	}	
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(),ReduceMerchandiseCommand);
    app.registerCommand(GetCategoriesCommand.commandName(),GetCategoriesCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(),EmptyMerchandisesCommand);

    app.register('http.categories',CategoriesService);
   

},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;
});


