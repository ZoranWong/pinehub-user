import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';
// import Categories from '@/models/Categories';

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';
const application = new Application(App, 'actity.merchandises');
application.run(function(app) {
  app.registerModel('model.activity.merchandises', Merchandises);
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
	app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
	app.registerCommand(ReduceMerchandiseCommand.commandName(),ReduceMerchandiseCommand);
	app.registerCommand(EmptyMerchandisesCommand.commandName(),EmptyMerchandisesCommand);
},function(mountComponent) {
	 _.extend(App,mountComponent);
	 const app = new Vue(App);
	 app.$mount();
	 return app;
});
