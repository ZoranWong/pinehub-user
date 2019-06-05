import Vue from 'vue';
import App from './index';
import SetAlwaysShoppingCartCommand from './commands/SetAlwaysShoppingCartCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function() {
        this.route = 'purchaseShoppingCart';
        this.registerCommand(SetAlwaysShoppingCartCommand.commandName(), SetAlwaysShoppingCartCommand)
    }, function() {
        this.currentPage = new Vue(this.mountComponent);
        this.currentPage.$mount();
    });
}
