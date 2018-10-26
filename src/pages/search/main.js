import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import StoreCategories from '@/models/StoreCategories';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';


import GetStoreCategoriesCommand from '@/commands/GetStoreCategoriesCommand';

import StoreCategoriesService from '@/services/http/StoreCategoriesService';

const application = new Application(App, 'today.merchandises');
application.run(function(app) {
	if(app.models) {
		app.registerModel('model.search.merchandises', Merchandises);
		app.registerModel('model.storeCategories',StoreCategories);
	}
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(),ReduceMerchandiseCommand);
    app.registerCommand(EmptyMerchandisesCommand.commandName(),EmptyMerchandisesCommand);
    app.registerCommand(ClearMerchandiseCommand.commandName(),ClearMerchandiseCommand);

    app.registerCommand(GetStoreCategoriesCommand.commandName(),GetStoreCategoriesCommand);

    app.register('http.storeCategories',StoreCategoriesService);


},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;

});
