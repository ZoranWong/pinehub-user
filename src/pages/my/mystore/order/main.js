import Vue from 'vue';
import App from './index';
import Application from '../../../../Application';
import _ from 'underscore';
import GatherOrderService from '../../../../services/http/GatherOrderService';
import GatherOrderCommand from '@/commands/GatherOrderCommand';
import GatherOrder from "@/models/GatherOrder";
const gathOrder = new Application(App, 'gather.orders');
gathOrder.run((app) => {
	app.models.addModel('model.gather.orders', GatherOrder);
	app.register('http.gatherOrder', GatherOrderService);
	app.registerCommand(GatherOrderCommand.commandName(), GatherOrderCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});