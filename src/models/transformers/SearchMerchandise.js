export default class SearchMerchandise {
  constructor(searchMerchandise) {
    this.idx = searchMerchandise['index'];
    this.id = searchMerchandise['id'];
    this.name = searchMerchandise['name'];
    this.thumbImage = searchMerchandise['main_image'];
    this.originPrice = searchMerchandise['origin_price'].toFixed(2);
    this.sellPrice = searchMerchandise['sell_price'].toFixed(2);
    this.stockNum = searchMerchandise['stock_num'];
    this.sellNum = searchMerchandise['sell_num'];


  }

}
