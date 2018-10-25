import Command from './Command';
export default class AddMerchandiseCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(merchandiseId, count, shopId = null) {
     // 与服务器打交道，获取数据，返回数据
    let service = this.service('http.merchandises');
    let [ id, name, quality,sellPrice, message, totalAmount]= await service.addMerchandises(merchandiseId, shopId, count );
    //console.log(id,  name, quality, message, totalAmount, merchandiseId, shopId);
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
      //console.log(id)
      this.service('popup').toast(message, 'none')
    }

  }
  static commandName() {
    return 'ADD_MERCHANDISE_TO_CART';
  }
}
