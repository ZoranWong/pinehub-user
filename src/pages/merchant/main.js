import App from './index';
import LoadStoreInfoCommand from './commands/LoadStoreInfoCommand';
import Vue from 'vue';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(LoadStoreInfoCommand.commandName(), LoadStoreInfoCommand);
        this.route = 'merchant.store';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.currentPage.$mount();
    });
}
