import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import SearchMerchandisesCommand from '@/commands/SearchMerchandisesCommand';



const application = new Application(App, 'search');
application.run(function(app) {
	if(app.models) {
		app.registerModel('model.search.merchandises', Merchandises);
		
	}

	app.registerCommand(SearchMerchandisesCommand.commandName(),SearchMerchandisesCommand);
},function(mountComponent) {
	 _.extend(App,mountComponent);
	 const app = new Vue(App);
	 app.$mount();
	 return app;
});
