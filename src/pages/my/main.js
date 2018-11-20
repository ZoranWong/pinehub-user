import App from './index';
import Vue from 'vue';
import MyInfoService from '@/services/http/MyInfoService';
import MyInfoCommand from '@/commands/MyInfoCommand';
const application = wx.$app;
application.setComponent(App).run(function () {
	this.register('http.myInfo', MyInfoService);
	this.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
	this.route = 'my';
}, function () {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});