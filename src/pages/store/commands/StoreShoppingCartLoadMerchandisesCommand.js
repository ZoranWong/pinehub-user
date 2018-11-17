import Command from '@/commands/ShoppingCartCommand';
export default class StoreShoppingCartLoadMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.store.shoppingCarts';
  }
  async handle (storeId, page = 1) {
    try {
      let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart').storeShoppingCartLoadMerchandises(storeId, page);
      console.log('活动购物车内全部商品', merchandises, totalNum, currentPage, totalPage, limit);
      this.addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit);
    } catch (e) {
      console.log('异常抛出', e);
    }
  }

  static commandName () {
    return 'STORE_SHOPPINGCART_LOAD_MERCHANDISES';
  }
}
