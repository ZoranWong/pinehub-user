import App from './index';
import Vue from 'vue';
import LoadBookingMallTicketsCommand from '../commands/LoadBookingMallTicketsCommand';
import CreateBookingMallOrderCommand from '../commands/CreateBookingMallOrderCommand';
import BookingMallShoppingCartChangeMerchandiseCommand from '../commands/BookingMallShoppingCartChangeMerchandiseCommand'

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerCommand(LoadBookingMallTicketsCommand.commandName(), LoadBookingMallTicketsCommand);
    this.registerCommand(CreateBookingMallOrderCommand.commandName(), CreateBookingMallOrderCommand);
    this.registerCommand(BookingMallShoppingCartChangeMerchandiseCommand.commandName(), BookingMallShoppingCartChangeMerchandiseCommand);

    this.route = 'shopSubmitOrder';
}, function () {
  this.currentPage = new Vue(this.mountComponent);
  this.currentPage.$mount();
});


