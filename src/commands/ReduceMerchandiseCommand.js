import Command from './Command';
export default class ReduceMerchandiseCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(merchandiseId, count, storeId = null) {
    let service = this.service('http.merchandises');
    let [ id, name, quality,sellPrice, delete_count, totalAmount]= await service.addMerchandises( 
          merchandiseId, storeId, count );
    console.log(id,  name, quality, delete_count, totalAmount, merchandiseId, storeId);
    if(typeof id !== 'undefined') {
      this.store().dispatch('model.shoppingCarts/changeCart', {
        id: id,
        merchandiseId: merchandiseId,
        count:count,
        name: name,
        sellPrice: sellPrice,
        totalAmount: totalAmount,
        shopId:shopId
      })
    }else{
      console.log(id)
      this.service('popup').toast(delete_count, 'none')
    }

  }
  static commandName() {
    return 'REDUCE_MERCHANDISE_TO_CART';
  }
}
