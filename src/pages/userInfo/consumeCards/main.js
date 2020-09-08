import App from './index';
import Vue from 'vue';
import ExchangeCommand from "./command/ExchangeCommand";
import MyConsumeCardsCommand from "./command/MyConsumeCardsCommand";
import ExchangedRecordCommand from "./command/ExchangedRecordCommand";

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.cards';
        this.registerCommand(ExchangeCommand.commandName(), ExchangeCommand);
        this.registerCommand(MyConsumeCardsCommand.commandName(), MyConsumeCardsCommand);
        this.registerCommand(ExchangedRecordCommand.commandName(), ExchangedRecordCommand);
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
export default {
    config: {
        disableSwipeBack: true
    }
}
