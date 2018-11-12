import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import MyInfo from "@/models/MyInfo";
import NearestStore from '@/models/NearestStore';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import MyInfoCommand from '@/commands/MyInfoCommand';
import FillCartMerchandisesCommand from '@/commands/FillCartMerchandisesCommand';
import GetNearestStoreCommand from '@/commands/GetNearestStoreCommand';

import StorageService from '@/services/mp/StorageService';
import MyInfoService from '@/services/http/MyInfoService';
import NearestStoreService from '@/services/http/NearestStoreService';

const application = new Application(App, 'actity.merchandises');
application.run(function(app) {

	if(app.models) {
		app.models.addModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.my.info', MyInfo);
		app.models.addModel('model.nearestStore', NearestStore);
	}

	app.register('http.myInfo', MyInfoService);
	app.register('http.nearestStore', NearestStoreService);

	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
	app.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
	app.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
	app.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);
	app.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
	app.registerCommand(FillCartMerchandisesCommand.commandName(), FillCartMerchandisesCommand);
	app.registerCommand(GetNearestStoreCommand.commandName(), GetNearestStoreCommand);

}, function(component) {
	_.extend(App, component);
	let app = new Vue(App);
	console.log('======++++======', app);
	app.$mount();
	return app;
});