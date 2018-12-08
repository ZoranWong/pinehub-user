import App from './index';
import Vue from 'vue';
import CreateOrderCommand from './commands/CreateOrderCommand';
const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerCommand(CreateOrderCommand.commandName(), CreateOrderCommand);
    this.route = 'payment';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
