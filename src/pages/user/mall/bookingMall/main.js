import App from './index';

// 购物车相关
import LoadBookingMallMerchandisesCommand from './commands/LoadBookingMallMerchandisesCommand';
import BookingMallShoppingCartClearMerchandisesCommand from './commands/BookingMallShoppingCartClearMerchandisesCommand';
import BookingMallShoppingCartChangeMerchandiseCommand from './commands/BookingMallShoppingCartChangeMerchandiseCommand';
import BookingMallShoppingCartLoadMerchandisesCommand from './commands/BookingMallShoppingCartLoadMerchandisesCommand';
import Categories from '@/models/Categories';
import Merchandises from '@/models/Merchandises';
import LoadBookingMallCategoriesCommand from './commands/LoadBookingMallCategoriesCommand';


import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('model.bookingMall.categories', Categories);
    this.registerModel('model.bookingMall.merchandises', Merchandises);
    // 注册购物车命令
    this.registerCommand(LoadBookingMallMerchandisesCommand.commandName(), LoadBookingMallMerchandisesCommand)
    this.registerCommand(BookingMallShoppingCartClearMerchandisesCommand.commandName(), BookingMallShoppingCartClearMerchandisesCommand)
    this.registerCommand(BookingMallShoppingCartChangeMerchandiseCommand.commandName(), BookingMallShoppingCartChangeMerchandiseCommand)
    this.registerCommand(BookingMallShoppingCartLoadMerchandisesCommand.commandName(), BookingMallShoppingCartLoadMerchandisesCommand)
    this.registerCommand(LoadBookingMallCategoriesCommand.commandName(), LoadBookingMallCategoriesCommand);

    this.route = 'bookingMall';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
