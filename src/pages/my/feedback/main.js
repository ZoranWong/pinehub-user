import App from './index';
import MyFeedbackService from '@/services/http/MyFeedbackService';
import MyFeedbackCommand from '@/commands/MyFeedbackCommand';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.register('http.myFeedback', MyFeedbackService);
    this.registerCommand(MyFeedbackCommand.commandName(), MyFeedbackCommand);
    this.route = 'myFeedback'
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
