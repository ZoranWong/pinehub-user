import Command from '@/commands/ShoppingCartCommand';
export default class ActivityShoppingCartLoadMerchandisesCommand extends Command {
  constructor (app) {
    super(app);
    this.model = 'model.activity.shoppingCarts';
  }
  async handle (activityId, page = 1) {
    try {
      let [merchandises, totalNum, currentPage, totalPage, limit] = await this.service('http.shoppingCart').activityShoppingCartLoadMerchandises(activityId, page);
      this.addMerchandisesToModel(merchandises, totalNum, currentPage, totalPage, limit);
    } catch (e) {
      console.log('异常抛出========+++++++', e);
    }
  }

  static commandName () {
    return 'ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES';
  }
}
