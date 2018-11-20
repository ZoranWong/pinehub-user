import Command from '@/commands/ShoppingCartCommand';
export default class StoreShoppingCartChangeMerchandiseCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.store.shoppingCarts';
  }
  async handle (storeId, merchandiseId, id = null, quality = 1) {
    try {
      console.log('store shopping cart change', storeId, merchandiseId, id, quality);
      let merchandise = null;
      if (id && quality === 0) {
        merchandise = await this.service('http.shoppingCart').deleteShoppingCart(id);
        if (merchandise) {
          this.deleteShoppingCart(id);
        }
        return;
      } else if (id === null) {
        merchandise = await this.service('http.shoppingCart').storeShoppingCartAddMerchandise(
          storeId,
          merchandiseId,
          quality);
        if (merchandise) {
          this.addMerchandiseToShoppingCart(merchandise);
        }
      } else if (id && quality > 0) {
        merchandise = await this.service('http.shoppingCart').storeShoppingCartChangeMerchandise(
          storeId,
          id,
          merchandiseId,
          quality);
        if (merchandise) {
          this.changeShoppingCartMerchandise(merchandise);
        }
      }
    } catch (e) {
      console.log('抛出异常', e);
    }
  }

  static commandName () {
    return 'STORE_SHOPPINGCART_CHANGE_MERCHANDISE';
  }
}
