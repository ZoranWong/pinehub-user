import App from './index';
import GatherOrderService from '@/services/http/GatherOrderService';
import GatherOrderCommand from '@/commands/GatherOrderCommand';
import GatherOrder from '@/models/Orders';

import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function() {
	this.registerModel('model.gather.orders', GatherOrder);
	this.register('http.gatherOrder', GatherOrderService);
	this.registerCommand(GatherOrderCommand.commandName(), GatherOrderCommand);
	this.route = 'myStoreOrder';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});