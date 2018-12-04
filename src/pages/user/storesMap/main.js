import App from './index';
import SearchLocation from '@/commands/SearchLocationCommand';
import LoadStoresAroundCommand from './commands/LoadStoresAroundCommand';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function() {
	this.registerCommand(LoadStoresAroundCommand.commandName(), LoadStoresAroundCommand);
	this.registerCommand(SearchLocation.commandName(), SearchLocation);
	this.route = 'storesMap';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});
