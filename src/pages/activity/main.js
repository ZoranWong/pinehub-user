import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
const application = new Application(App, 'actity.merchandises');
application.run(function(app) {
	if(app.models) {
		app.models.addModel('model.activity.merchandises', Merchandises);
	}
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
}, function(mountComponent) {
	_.extend(App, mountComponent);
	const app = new Vue(App);
	app.$mount();
	return app;
});