import Command from './ShoppingCartCommand';
export default class BookingMallShoppingCartClearMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.bookingMall.shoppingCarts';
  }
  async handle () {
    try {
      console.log('======== clear activity shopping cart ========');
      let result = await this.service('http.shoppingCart').bookingShoppingCartClearMerchandises();
      if (result) {
        this.store().dispatch(this.model + '/reset', {
          activity: true
        });
      }
    } catch (e) {
      console.log('抛出异常', e);
    }
  }

  static commandName () {
    return 'BOOKING_MALL_SHOPPINGCART_CLEAR_MERCHANDISES';
  }
}
