import App from './index';

import LoadStorePurchaseOrderCommand from './commands/LoadStorePurchaseOrderCommand';

import LoadMerchantStoreCategoriesCommand from './commands/LoadMerchantStoreCategoriesCommand';

import LoadMerchantStoreMerchandisesCommand from './commands/LoadMerchantStoreMerchandisesCommand';

import UpdateMerchandiseStockCommand from './commands/UpdateMerchandiseStockCommand';

import SalesChartsUpdateCommand from './commands/SalesChartsUpdateCommand';

import SalesInfo from '@/models/SalesInfo';
import Orders from '@/models/Orders';
import Categories from '@/models/Categories';
import Merchandises from '@/models/Merchandises';

import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.models.addModel('model.salesInfo', SalesInfo);
    this.models.addModel('model.purchase.orders', Orders);
    this.registerModel('model.merchant.store.categories', Categories);
    this.registerModel('model.merchant.store.merchandises', Merchandises);


    this.registerCommand(LoadStorePurchaseOrderCommand.commandName(), LoadStorePurchaseOrderCommand);

    this.registerCommand(LoadMerchantStoreCategoriesCommand.commandName(), LoadMerchantStoreCategoriesCommand);

    this.registerCommand(LoadMerchantStoreMerchandisesCommand.commandName(), LoadMerchantStoreMerchandisesCommand);

    this.registerCommand(UpdateMerchandiseStockCommand.commandName(), UpdateMerchandiseStockCommand);

    this.registerCommand(SalesChartsUpdateCommand.commandName(), SalesChartsUpdateCommand);
    this.route = 'merchant.salesInfo';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
