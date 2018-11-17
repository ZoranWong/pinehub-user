import App from './index';
import Vue from 'vue';
import LoadActivityTicketsCommand from '../commands/LoadActivityTicketsCommand';
const application = wx.$app;
application.setComponent(App).run(function () {

  this.registerCommand(LoadActivityTicketsCommand.commandName(), LoadActivityTicketsCommand);

  this.route = 'activityCoupon';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
