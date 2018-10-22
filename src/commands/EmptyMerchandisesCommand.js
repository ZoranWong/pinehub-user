import Command from './Command';
export default class EmptyMerchandisesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(storeId) {
    console.log(66333)
     // 与服务器打交道，获取数据，返回数据
    let count = await  this.service('http.merchandises').emptyMerchandises(storeId);
    if(count > 0) {
      this.store().dispatch('model.shoppingCarts/reset', {
        storeId: storeId
      });
    }
  }
  static commandName() {
    return 'EMPTY_MERCHANDISES_TO_CART';
  }
}
