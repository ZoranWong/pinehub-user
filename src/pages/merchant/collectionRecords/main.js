import App from './index';
import Vue from 'vue';
import Orders from '@/models/Orders';
import LoadStoreOrdersCommand from './commands/LoadStoreOrdersCommand';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.registerModel('model.store.orders', Orders);
    this.registerCommand(LoadStoreOrdersCommand.commandName(), LoadStoreOrdersCommand);
	this.route = 'merchant.collectionRecords';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});