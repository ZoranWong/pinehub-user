import Vue from 'vue';
import App from './index';
import Application from '../../../../Application';
import _ from 'underscore';
import DistributeOrderService from '../../../../services/http/DistributeOrderService';
import DistributeOrderCommand from '@/commands/DistributeOrderCommand';
import DistributeOrder from "@/models/DistributeOrder";
const disOrder = new Application(App, 'distribute.orders');
disOrder.run((app) => {
	app.registerModel('model.distribute.orders', DistributeOrder);
	app.register('http.distributeOrder', DistributeOrderService);
	app.registerCommand(DistributeOrderCommand.commandName(), DistributeOrderCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});
