import Command from '@/commands/ShoppingCartCommand';
export default class ActivityShoppingCartChangeMerchandiseCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.newEvents.shoppingCarts';
  }
  async handle (activityId, merchandiseId, id = null, quality = 1) {
    try {
      let merchandise = null;
      if (id && quality === 0) {
        merchandise = await this.service('http.shoppingCart').deleteShoppingCart(id);
        if (merchandise) {
          this.deleteShoppingCart(id);
        }
        return;
      } else if (id === null) {
        merchandise = await this.service('http.shoppingCart').activityShoppingCartAddMerchandise(
          activityId,
          merchandiseId,
          quality);
        if (merchandise) {
          this.addMerchandiseToShoppingCart(merchandise);
        }
      } else if (id && quality > 0) {
        merchandise = await this.service('http.shoppingCart').activityShoppingCartChangeMerchandise(
          activityId,
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
    return 'ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE';
  }
}
