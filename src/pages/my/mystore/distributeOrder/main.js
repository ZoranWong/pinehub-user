import Vue from 'vue';
import App from './index';
import Application from '../../../../Application';
import _ from 'underscore';
import SelfextraOrderService from '../../../../services/http/SelfextraOrderService';
import SelfextraOrderCommand from '@/commands/SelfextraOrderCommand';
import SelfextraOrders from "@/models/SelfextraOrders";
const extraOrder = new Application(App, 'extra.orders');
extraOrder.run((app) => {
	app.models.addModel('model.extra.orders', SelfextraOrders);
	app.register('http.selfextraOrder', SelfextraOrderService);
	app.registerCommand(SelfextraOrderCommand.commandName(), SelfextraOrderCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});