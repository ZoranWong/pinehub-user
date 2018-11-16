import Command from './ShoppingCartCommand';
export default class BookingMallShoppingCartLoadMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.activity.shoppingCarts';
  }
  async handle (page = 1) {
    console.log('购物车+++++++++++++');
    try {
      let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart').bookingMallShoppingCartLoadMerchandises(page);
      console.log('活动购物车内全部商品', merchandises, totalNum, currentPage, totalPage, limit);
      this.addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit);
    } catch (e) {
      console.log('异常抛出========+++++++', e);
      return false;
    }
  }

  static commandName () {
    return 'BOOKING_MALL_SHOPPINGCART_LOAD_MERCHANDISES';
  }
}
