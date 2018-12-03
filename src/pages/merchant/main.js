import App from './index';
import MyStoreInfoCommand from '@/commands/MyStoreInfoCommand';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () { 
    this.registerCommand(MyStoreInfoCommand.commandName(), MyStoreInfoCommand);
    this.route = 'myStore';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
