import App from './index';

import LoadPickUpOrdersCommand from './commands/LoadPickUpOrdersCommand';
import Orders from '@/models/Orders';
import Vue from 'vue';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.models.addModel('model.pickUp.orders', Orders);
        this.registerCommand(LoadPickUpOrdersCommand.commandName(), LoadPickUpOrdersCommand);
        this.route = 'merchant.pickUpOrders';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
        this.currentPage.$mount();
    });
}
