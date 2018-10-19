export default class ShoppingCart {
  constructor(cart) {
    this.idx = cart['index'];
    this.id = cart['id']; 
    this.merchandiseId = cart['merchandise_id'];
    this.name = cart['name'];
    this.count = cart['quality'];
    this.sellPrice = cart['sell_price'];
    this.totalAmount = cart['quality'] * cart['sell_price'];
    this.shopId = cart['shop_id'];        
  }
}