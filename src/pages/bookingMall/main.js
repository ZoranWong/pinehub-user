import App from './index';
// 产品模型和产品服务
import Merchandises from '@/models/Merchandises';
import MerchandisesService from '@/services/http/MerchandisesService';
// 购物车相关
import ReservationLoadingMerchandisesCommand from '@/commands/LoadBookingMallMerchandisesCommand';
import ReservationShoppingCartClearMerchandisesCommand from '@/commands/BookingMallShoppingCartClearMerchandisesCommand';
import ReservationShoppingCartChangeMerchandiseCommand from '@/commands/BookingMallShoppingCartChangeMerchandiseCommand';
import ReservationShoppingCartLoadMerchandisesCommand from '@/commands/BookingMallShoppingCartLoadMerchandisesCommand';
//分类模型
import Categories from '@/models/Categories';


import GetCategoriesCommand from '@/commands/GetCategoriesCommand';

import CategoriesService from '@/services/http/CategoriesService';

import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function() {

	// 产品模型和产品服务
	this.models.addModel('model.bookingMall.merchandises', Merchandises);
	//分类模型
	this.models.addModel('model.categories', Categories);

	// 产品模型和产品服务
	this.register('http.merchandises', MerchandisesService)
	// 注册购物车命令
	this.registerCommand(ReservationLoadingMerchandisesCommand.commandName(), ReservationLoadingMerchandisesCommand)
	this.registerCommand(ReservationShoppingCartClearMerchandisesCommand.commandName(), ReservationShoppingCartClearMerchandisesCommand)
	this.registerCommand(ReservationShoppingCartChangeMerchandiseCommand.commandName(), ReservationShoppingCartChangeMerchandiseCommand)
	this.registerCommand(ReservationShoppingCartLoadMerchandisesCommand.commandName(), ReservationShoppingCartLoadMerchandisesCommand)

	this.registerCommand(GetCategoriesCommand.commandName(), GetCategoriesCommand);
	this.register('http.categories', CategoriesService);
	this.route = 'reserveShop';
}, function() {
	this.currentPage = new Vue(this.mountComponent);
	this.currentPage.$mount();
});
