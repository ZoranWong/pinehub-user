export default class ShopMerchandises {
  constructor(shopMerchandises) {
    this.idx = shopMerchandises['index'];
    this.id = shopMerchandises['id'];
    this.name = shopMerchandises['name'];
    this.thumbImage = shopMerchandises['main_image'];
    this.sellPrice = shopMerchandises['sell_price'].toFixed(2);
    this.originPrice = shopMerchandises['origin_price'].toFixed(2);
    this.sellCount = shopMerchandises['sell_count'];
    this.tags = shopMerchandises['tags'];
    this.describe = shopMerchandises['describe'];
    this.newImage = shopMerchandises['new_image'];
    this.shopId  = shopMerchandises['shop_id'];
  }

}
