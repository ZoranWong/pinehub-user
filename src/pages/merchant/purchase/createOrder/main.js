import Vue from 'vue';
import App from './index';
import ImportShoppingCartCommand from './commands/ImportShoppingCartCommand';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.route = 'purchaseCreateOrder';
	this.registerCommand(ImportShoppingCartCommand.commandName(), ImportShoppingCartCommand);
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});