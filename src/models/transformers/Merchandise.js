export default class Merchandise {
  constructor(merchandise) {
    this.idx = merchandise['index'];
    this.id = merchandise['id'];
    this.name = merchandise['name'];
    this.thumbImage = merchandise['main_image'];
    this.sellPrice = merchandise['sell_price'].toFixed(2);
    this.originPrice = merchandise['origin_price'].toFixed(2);
    this.sellCount = merchandise['sell_count'];
    this.tags = merchandise['tags'];
    this.describe = merchandise['describe'];
    this.shopId  = merchandise['shop_id'];
  }

}
