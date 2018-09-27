import Vue from 'vue';
import Application from '../../Application';
import App from './index';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
const application = new Application(App, 'actity.merchandises');
application.run(function(app) {
	console.log('before app build ');
	if(app.models) {
		console.log('model.merchandises');
		app.models.addModel('model.merchandises', Merchandises);
	}	
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;
});
console.log(application);
