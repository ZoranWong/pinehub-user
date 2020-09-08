import App from './index';
import Vue from 'vue';
import ExchangeCommand from "./command/ExchangeCommand";
import MyConsumeCardsCommand from "./command/MyConsumeCardsCommand";
import ExchangedRecordCommand from "./command/ExchangedRecordCommand";
import ActivateConsumerCardCommand from "../../../commands/ActivateConsumerCardCommand"

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.route = 'user.cards';
        this.registerCommand(ExchangeCommand.commandName(), ExchangeCommand);
        this.registerCommand(MyConsumeCardsCommand.commandName(), MyConsumeCardsCommand);
        this.registerCommand(ExchangedRecordCommand.commandName(), ExchangedRecordCommand);
        this.registerCommand(ActivateConsumerCardCommand.commandName(), ActivateConsumerCardCommand)
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
export default {
    config: {
        disableSwipeBack: true
    }
}
