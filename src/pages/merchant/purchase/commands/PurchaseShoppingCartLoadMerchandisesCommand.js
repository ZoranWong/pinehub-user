import Command from '@/commands/ShoppingCartCommand';
export default class PurchaseShoppingCartLoadMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.purchase.shoppingCarts';
  }
  async handle (page = 1) {
    console.log('购物车+++++++++++++');
    try {
      let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart').purchaseShoppingCartLoadMerchandises(page);
      console.log('活动购物车内全部商品', merchandises, totalNum, currentPage, totalPage, limit);
      this.addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit);
    } catch (e) {
      console.log('异常抛出========+++++++', e);
      return false;
    }
  }

  static commandName () {
    return 'PURCHASE_SHOPPINGCART_LOAD_MERCHANDISES';
  }
}
