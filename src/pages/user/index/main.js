import App from './index';
import Vue from 'vue';
import ActivityService from '@/services/http/ActivityService';
import GetActivityInfoCommand from '@/commands/GetActivityInfoCommand';
import RegisterCommand from './commands/RegisterCommand';
import Activity from '@/models/Activity';
const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('model.activity', Activity);
    this.register('http.activity', ActivityService);
    this.registerCommand(GetActivityInfoCommand.commandName(), GetActivityInfoCommand);
    this.registerCommand(RegisterCommand.commandName(), RegisterCommand);
    this.route = 'index';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
