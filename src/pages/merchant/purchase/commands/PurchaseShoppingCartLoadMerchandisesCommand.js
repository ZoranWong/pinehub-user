import Command from '@/commands/ShoppingCartCommand';
export default class PurchaseShoppingCartLoadMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.purchase.shoppingCarts';
  }
  async handle (page = 1) {
    try {
      let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart')
        .purchaseShoppingCartLoadMerchandises(page);
      this.addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit);
    } catch (e) {
      return false;
    }
  }

  static commandName () {
    return 'PURCHASE_SHOPPINGCART_LOAD_MERCHANDISES';
  }
}
