import Command from '@/commands/ShoppingCartCommand';
export default class ActivityShoppingCartClearMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.activity.shoppingCarts';
  }
  async handle (activityId) {
    try {
      let result = await this.service('http.shoppingCart').activityShoppingCartClearMerchandises(activityId);
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
    return 'ACTIVITY_SHOPPINGCART_CLEAR_MERCHANDISES';
  }
}
