import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';

const application = new Application(App, 'actity.merchandises');
application.run(function(app) {
	if(app.models) {
		//app.registerModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.shoppingCarts', ShoppingCarts);
	}	
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
<<<<<<< HEAD
}, function(mountComponent) {
	_.extend(App, mountComponent);
	const app = new Vue(App);
	app.$mount();
	return app;
});
=======
	app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;
});



>>>>>>> fc9bce91f6936a5928c5f25ca521de5cf1dbe499
