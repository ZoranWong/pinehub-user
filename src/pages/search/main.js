import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShopMerchandises from '@/models/ShopMerchandises';
import SearchMerchandisesCommand from '@/commands/SearchMerchandisesCommand';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';


const application = new Application(App, 'actity.merchandises');
application.run(function(app) {
	if(app.models) {
		app.registerModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.search', ShopMerchandises);
	}

	app.registerCommand(SearchMerchandisesCommand.commandName(),SearchMerchandisesCommand);
},function(mountComponent) {
	 _.extend(App,mountComponent);
	 const app = new Vue(App);
	 app.$mount();
	 return app;
});
