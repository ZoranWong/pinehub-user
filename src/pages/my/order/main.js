import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import MyOrderService from '../../../services/http/MyOrderService';
import MyOrderCommand from '@/commands/MyOrderCommand';
import Orders from "@/models/Orders";
const myOrder = new Application(App, 'my.order');
myOrder.run((app) => {
	app.models.addModel('model.my.orders', Orders);
	console.log('appapp',app);
	app.register('http.myorders', MyOrderService);
//	app.registerCommand(MyOrderCommand.commandName(), MyOrderCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});