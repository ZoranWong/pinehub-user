import App from './index';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';

import MyStoreStatusPurchaseService from '@/services/http/MyStoreStatusPurchaseService';
import MyStoreStatusPurchaseCommand from '@/commands/MyStoreStatusPurchaseCommand';
import MyStoreStatusPurchase from '@/models/MyStoreStatusPurchase';

import MyStoreStatusSalesService from '@/services/http/MyStoreStatusSalesService';
import MyStoreStatusSalesCommand from '@/commands/MyStoreStatusSalesCommand';
import MyStoreStatusSales from '@/models/MyStoreStatusSales';

import MyStoreCategoriesService from '@/services/http/CategoriesService';
import MyStoreCategoriesCommand from '@/commands/MyStoreCategoriesCommand';

import MyStoreCategoryMerchandisesService from '@/services/http/MyStoreCategoryMerchandisesService';
import MyStoreChangeCategoryCommand from '@/commands/MyStoreChangeCategoryCommand';
import MyStoreCategoryMerchandises from '@/models/Merchandises';

import MyStoreModifyStockService from '@/services/http/MyStoreModifyStockService';
import MyStoreModifyStockCommand from '@/commands/MyStoreModifyStockCommand';

import EChartsService from '@/services/mp/EChartsService';
import MySalesEChartCommand from '@/commands/MySalesEChartCommand';
import MySalesEChart from '@/models/MySalesEChart';

import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('myStore.merchandises', Merchandises);
    this.registerModel('store.categories', Categories);

    this.models.addModel('model.my.store.status.purchase', MyStoreStatusPurchase);
    this.register('http.myStoreStatusPurchase', MyStoreStatusPurchaseService);
    this.registerCommand(MyStoreStatusPurchaseCommand.commandName(), MyStoreStatusPurchaseCommand);

    this.models.addModel('model.my.store.status.sales', MyStoreStatusSales);
    this.register('http.myStoreStatusSales', MyStoreStatusSalesService);
    this.registerCommand(MyStoreStatusSalesCommand.commandName(), MyStoreStatusSalesCommand);

    this.models.addModel('model.my.store.categories', Categories);
    this.register('http.myStoreCategories', MyStoreCategoriesService);
    this.registerCommand(MyStoreCategoriesCommand.commandName(), MyStoreCategoriesCommand);

    this.models.addModel('model.my.store.category.merchandises', MyStoreCategoryMerchandises);
    this.register('http.myStoreCategoryMerchandises', MyStoreCategoryMerchandisesService);
    this.registerCommand(MyStoreChangeCategoryCommand.commandName(), MyStoreChangeCategoryCommand);

    this.register('http.myStoreModifyStock', MyStoreModifyStockService);
    this.registerCommand(MyStoreModifyStockCommand.commandName(), MyStoreModifyStockCommand);

    this.models.addModel('model.my.sales.echart', MySalesEChart);
    this.register('mp.eCharts', EChartsService);
    this.registerCommand(MySalesEChartCommand.commandName(), MySalesEChartCommand);
    this.route = 'myStoreStatus';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
