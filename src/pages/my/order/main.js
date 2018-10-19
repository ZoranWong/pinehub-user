import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import MyOrderService from '../../../services/http/MyOrderService';
import MyOrderCommand from '@/commands/MyOrderCommand';
const myOrder = new Application(App, 'my.order');
myOrder.run((app) => {
	app.register('myorder', MyOrderService);
	app.registerCommand(MyOrderCommand.commandName(), MyOrderCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
	let app = new Vue(App);
	app.$mount();
	return app;
});