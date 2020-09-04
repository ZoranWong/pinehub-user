import App from './index';
import Vue from 'vue';
import CreateOrderCommand from './commands/CreateOrderCommand';
import GetShopInfoCommand from './commands/GetShopInfoCommand';
import MyConsumeCardsCommand from '../../userInfo/consumeCards/command/MyConsumeCardsCommand'
import GetActiveCardCommand from '../../userInfo/consumeCards/command/GetActiveCardCommand'

import AcquisitionNotActiveCommand from '../../enties/index/commands/AcquisitionNotActiveCommand'

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(CreateOrderCommand.commandName(), CreateOrderCommand);
        this.registerCommand(GetShopInfoCommand.commandName(), GetShopInfoCommand);
        this.registerCommand(MyConsumeCardsCommand.commandName(), MyConsumeCardsCommand);
        this.registerCommand(GetActiveCardCommand.commandName(), GetActiveCardCommand);
        this.registerCommand(AcquisitionNotActiveCommand.commandName(), AcquisitionNotActiveCommand);
        this.route = 'payment';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
