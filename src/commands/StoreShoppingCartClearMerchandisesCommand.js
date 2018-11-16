import Command from './ShoppingCartCommand';
export default class StoreShoppingCartClearMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.store.shoppingCarts';
  }
  async handle (storeId) {
    try {
      let result = await this.service('http.shoppingCart').storeShoppingCartClearMerchandises(storeId);
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
    return 'STORE_SHOPPINGCART_CLEAR_MERCHANDISES';
  }
}
