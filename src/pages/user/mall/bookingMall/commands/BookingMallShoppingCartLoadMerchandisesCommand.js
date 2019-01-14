import Command from '@/commands/ShoppingCartCommand';
export default class BookingMallShoppingCartLoadMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.activity.shoppingCarts';
  }
  async handle (page = 1) {
    try {
      let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart').bookingMallShoppingCartLoadMerchandises(page);
      this.addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit);
    } catch (e) {
      return false;
    }
  }

  static commandName () {
    return 'BOOKING_MALL_SHOPPINGCART_LOAD_MERCHANDISES';
  }
}
