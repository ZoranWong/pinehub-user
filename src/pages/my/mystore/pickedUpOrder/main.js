import App from './index';

import SelfextraOrderCommand from './commands/SelfextraOrderCommand';
import Orders from '@/models/Orders';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function(app) {
	this.models.addModel('model.extra.orders', Orders);
	this.registerCommand(SelfextraOrderCommand.commandName(), SelfextraOrderCommand);
	this.route = 'myStorePickedUpOrder';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});