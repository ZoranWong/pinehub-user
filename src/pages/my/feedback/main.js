import Vue from 'vue';
import App from './index';
import _ from 'underscore';
import MyFeedbackService from '@/services/http/MyFeedbackService';
import MyFeedbackCommand from '@/commands/MyFeedbackCommand';
const application = wx.$app;
application.setComponent(App).run((app) => {
    app.register('http.myFeedback', MyFeedbackService);
    app.registerCommand(MyFeedbackCommand.commandName(), MyFeedbackCommand);
}, (mountComponent) => {
    _.extend(App, mountComponent);
    let app = new Vue(App);
    app.$mount();
    return app;
});
