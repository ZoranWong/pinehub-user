import App from './index';
import Vue from 'vue';
import ExchangeCommand from "./command/ExchangeCommand";

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.cards';
        this.registerCommand(ExchangeCommand.commandName(), ExchangeCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
export default {
    config: {
        disableSwipeBack: true
    }
}
