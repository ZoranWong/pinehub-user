import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import GetCategoriesCommand from '@/commands/GetCategoriesCommand';

import CategoriesService from '@/services/http/CategoriesService';

const application = new Application(App, 'shop.merchandises');
application.run(function(app) {

	if(app.models) {
		app.models.addModel('model.reserveShop.merchandises', Merchandises);
		app.models.addModel('model.categories', Categories);
		
	}	
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(),ReduceMerchandiseCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(),EmptyMerchandisesCommand);

    app.registerCommand(GetCategoriesCommand.commandName(),GetCategoriesCommand);
    
    app.register('http.categories',CategoriesService);
   

},function(component) {
	_.extend(App, component);
	let app = new Vue(App);
	app.$mount();
 	return app;
});


