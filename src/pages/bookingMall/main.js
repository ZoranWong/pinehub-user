import App from './index';
// 产品模型和产品服务
import Merchandises from '@/models/Merchandises';
import MerchandisesService from '@/services/http/MerchandisesService';
// 购物车相关
import LoadBookingMallMerchandisesCommand from './commands/LoadBookingMallMerchandisesCommand';
import BookingMallShoppingCartClearMerchandisesCommand from './commands/BookingMallShoppingCartClearMerchandisesCommand';
import BookingMallShoppingCartChangeMerchandiseCommand from './commands/BookingMallShoppingCartChangeMerchandiseCommand';
import BookingMallShoppingCartLoadMerchandisesCommand from './commands/BookingMallShoppingCartLoadMerchandisesCommand';
// 分类模型
import Categories from '@/models/Categories';


import GetCategoriesCommand from '@/commands/GetCategoriesCommand';


import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
  // 产品模型和产品服务
  this.models.addModel('model.bookingMall.merchandises', Merchandises);
  // 分类模型
  this.models.addModel('model.categories', Categories);

  // 产品模型和产品服务
  this.register('http.merchandises', MerchandisesService)
  // 注册购物车命令
  this.registerCommand(LoadBookingMallMerchandisesCommand.commandName(), LoadBookingMallMerchandisesCommand)
  this.registerCommand(BookingMallShoppingCartClearMerchandisesCommand.commandName(), BookingMallShoppingCartClearMerchandisesCommand)
  this.registerCommand(BookingMallShoppingCartChangeMerchandiseCommand.commandName(), BookingMallShoppingCartChangeMerchandiseCommand)
  this.registerCommand(BookingMallShoppingCartLoadMerchandisesCommand.commandName(), BookingMallShoppingCartLoadMerchandisesCommand)
  this.registerCommand(GetCategoriesCommand.commandName(), GetCategoriesCommand);

  this.route = 'reserveShop';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});
