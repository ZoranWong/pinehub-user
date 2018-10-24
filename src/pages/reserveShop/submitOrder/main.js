
import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';


import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';

import MyInfoService from '@/services/http/MyInfoService';
import MyInfoCommand from '@/commands/MyInfoCommand';
import MyInfo from "@/models/MyInfo";



const application = new Application(App, 'actity.merchandises');
application.run(function(app) {

	if(app.models) {
		app.models.addModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.shoppingCarts', ShoppingCarts);
		app.models.addModel('model.my.info', MyInfo);


	}	
	app.register('http.myInfo', MyInfoService);
	app.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(ReduceMerchandiseCommand.commandName(),ReduceMerchandiseCommand);



},function(component) {
	_.extend(App, component);
	let app = new Vue(App);
	app.$mount();
 	return app;
});


