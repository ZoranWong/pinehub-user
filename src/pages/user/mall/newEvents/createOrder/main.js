import App from './index';
import Vue from 'vue';
import ActivityShoppingCartChangeMerchandiseCommand from '../commands/ActivityShoppingCartChangeMerchandiseCommand';
import ActivityShoppingCartLoadMerchandisesCommand from '../commands/ActivityShoppingCartLoadMerchandisesCommand';
import LoadActivityTicketsCommand from '../commands/LoadActivityTicketsCommand';
import CreateActivityOrderCommand from '../commands/CreateActivityOrderCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(ActivityShoppingCartChangeMerchandiseCommand.commandName(), ActivityShoppingCartChangeMerchandiseCommand);
        this.registerCommand(ActivityShoppingCartLoadMerchandisesCommand.commandName(), ActivityShoppingCartLoadMerchandisesCommand);
        this.registerCommand(LoadActivityTicketsCommand.commandName(), LoadActivityTicketsCommand);
        this.registerCommand(CreateActivityOrderCommand.commandName(), CreateActivityOrderCommand);
        this.route = 'activitySubmitOrder';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
