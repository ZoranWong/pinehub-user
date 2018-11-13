import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import MyStoreInfoService from '@/services/http/MyStoreInfoService';
import MyStoreInfoCommand from '@/commands/MyStoreInfoCommand';
import MyStoreInfo from '@/models/MyStoreInfo';
const application = wx.$app;
application.setComponent(App).run((app) => {
    app.models.addModel('model.my.store', MyStoreInfo);
    app.register('http.myStoreInfo', MyStoreInfoService);
    app.registerCommand(MyStoreInfoCommand.commandName(), MyStoreInfoCommand);
}, (mountComponent) => {
    _.extend(App, mountComponent);
    let app = new Vue(App);
    app.$mount();
    return app;
});
