import Vue from 'vue';
import App from './index';
import Application from '@/Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import Categories from '@/models/Categories';

import MyStoreStatusPurchaseService from '@/services/http/MyStoreStatusPurchaseService';
import MyStoreStatusPurchaseCommand from '@/commands/MyStoreStatusPurchaseCommand';
import MyStoreStatusPurchase from "@/models/MyStoreStatusPurchase";

import MyStoreStatusSalesService from '@/services/http/MyStoreStatusSalesService';
import MyStoreStatusSalesCommand from '@/commands/MyStoreStatusSalesCommand';
import MyStoreStatusSales from "@/models/MyStoreStatusSales";

import MyStoreCategoriesService from '@/services/http/MyStoreCategoriesService';
import MyStoreCategoriesCommand from '@/commands/MyStoreCategoriesCommand';
import MyStoreCategories from "@/models/List";

import MyStoreCategoryMerchandisesService from '@/services/http/MyStoreCategoryMerchandisesService';
import MyStoreChangeCategoryCommand from '@/commands/MyStoreChangeCategoryCommand';
import MyStoreCategoryMerchandises from "@/models/MyStoreCategoryMerchandises";

import MyStoreModifyStockService from '@/services/http/MyStoreModifyStockService';
import MyStoreModifyStockCommand from '@/commands/MyStoreModifyStockCommand';


const myMystoreStatus = new Application(App, 'my.mystore.status');
myMystoreStatus.run((app) => {
	app.registerModel('myStore.merchandises', Merchandises);
	app.registerModel('store.categories', Categories);
	
	app.models.addModel('model.my.store.status.purchase', MyStoreStatusPurchase);
	app.register('http.myStoreStatusPurchase', MyStoreStatusPurchaseService);
	app.registerCommand(MyStoreStatusPurchaseCommand.commandName(), MyStoreStatusPurchaseCommand);
	
	app.models.addModel('model.my.store.status.sales', MyStoreStatusSales);
	app.register('http.myStoreStatusSales', MyStoreStatusSalesService);
	app.registerCommand(MyStoreStatusSalesCommand.commandName(), MyStoreStatusSalesCommand);
	
	app.models.addModel('model.my.store.categories', MyStoreCategories);
	app.register('http.myStoreCategories', MyStoreCategoriesService);
	app.registerCommand(MyStoreCategoriesCommand.commandName(), MyStoreCategoriesCommand);
	
	app.models.addModel('model.my.store.category.merchandises', MyStoreCategoryMerchandises);
	app.register('http.myStoreCategoryMerchandises', MyStoreCategoryMerchandisesService);
	app.registerCommand(MyStoreChangeCategoryCommand.commandName(), MyStoreChangeCategoryCommand);
	
	app.register('http.myStoreModifyStock', MyStoreModifyStockService);
	app.registerCommand(MyStoreModifyStockCommand.commandName(), MyStoreModifyStockCommand);
}, (component) => {
	_.extend(App, component);
	let app = new Vue(App);
	app.$mount();
	return app;
});