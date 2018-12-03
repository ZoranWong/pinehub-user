import App from './index';
import DistributeOrderCommand from './commands/DistributeOrderCommand';
import Vue from 'vue';
const application = wx.$app;
application.setComponent(App).run(function() {
	this.registerCommand(DistributeOrderCommand.commandName(), DistributeOrderCommand);
	this.route = 'myStoreDistributeOrder'
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});
