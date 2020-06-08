
// 取货方式
// const QR = require('../../../static/jssdk/weapp-qrcode.js');
export default class Order {
  constructor (good) {
      this.stockNum = good['product_entities'][0].stock;
  }
}
