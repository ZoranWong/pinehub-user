import Command from './Command';
export default class ReduceMerchandiseCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(merchandiseId, count, shopId = null) {
    //console.log("reducecommand-id")
    let [ id, name, quality,sellPrice, delete_count, totalAmount,  thumbImage ]= await this.service('http.merchandises').reduceMerchandises( merchandiseId, shopId, count );
    // console.log(id,  name, quality, delete_count, totalAmount, merchandiseId, storeId);
    //console.log("reducecommand-id",count)

    if(typeof id !== 'undefined') {
      this.store().dispatch('model.shoppingCarts/reduce', {
        id: id,
        merchandiseId: merchandiseId,
        count:count,
        name: name,
        sellPrice: sellPrice,
        totalAmount: totalAmount,
        shopId:shopId,
        thumbImage:thumbImage
      })
    }else{
      //this.service('popup').toast(delete_count, 'none')
    }

  }
  static commandName() {
    return 'REDUCE_MERCHANDISE_TO_CART';
  }
}
