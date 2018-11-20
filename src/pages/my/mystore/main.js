import App from './index';
import MyStoreInfoService from '@/services/http/MyStoreInfoService';
import MyStoreInfoCommand from '@/commands/MyStoreInfoCommand';
import MyStoreInfo from '@/models/MyStoreInfo';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.models.addModel('model.my.store', MyStoreInfo);
    this.register('http.myStoreInfo', MyStoreInfoService);
    this.registerCommand(MyStoreInfoCommand.commandName(), MyStoreInfoCommand);
    this.route = 'myStore';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
