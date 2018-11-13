import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import MyInfoService from '@/services/http/MyInfoService';
import MyInfoCommand from '@/commands/MyInfoCommand';
import MyInfo from '@/models/MyInfo';
const application = wx.$app;
application.setComponent(App).run((app) => {
    app.registerModel('model.my.info', MyInfo);
    app.register('http.myInfo', MyInfoService);
    app.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
}, (mountComponent) => {
	_.extend(App, mountComponent);
    let app = new Vue(App);
    app.$mount();
    return app;
});
