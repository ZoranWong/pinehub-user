import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import NearestStore from '@/models/NearestStore';
import StoreCategories from '@/models/StoreCategories';


import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';
import GetStoreCategoriesCommand from '@/commands/GetStoreCategoriesCommand';

import NearestStoreService from '@/services/http/NearestStoreService';
import StoreCategoriesService from '@/services/http/StoreCategoriesService';

const application = new Application(App, 'today.merchandises');
application.run(function(app) {
	if(app.models) {
		app.registerModel('model.today.merchandises', Merchandises);
		app.models.addModel('model.nearestStore',NearestStore);
		app.models.addModel('model.storeCategories',StoreCategories);
	}
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(),ReduceMerchandiseCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(),EmptyMerchandisesCommand);
    
    app.registerCommand(GetNearestStoreCommand.commandName(),GetNearestStoreCommand);
    app.registerCommand(GetStoreCategoriesCommand.commandName(),GetStoreCategoriesCommand);
  
    app.register('http.nearestStore', NearestStoreService);
    app.register('http.storeCategories',StoreCategoriesService);

  
},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;

});
