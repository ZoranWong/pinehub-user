import Command from './Command';
export default class FillCartMerchandisesCommand extends Command {
  constructor(app) {
    super(app);
  }

  handle(shopId = null) {
     // 与服务器打交道，获取数据，返回数据
     //console.log('fill data start');
    this.store().dispatch('model.shoppingCarts/fillCartFromCache', {shopId: shopId});
  }
  static commandName() {
    return 'FILL_CART_FROM_CACHE';
  }
}
