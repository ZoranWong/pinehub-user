import Command from './Command';
export default class CreateOrderCommand extends Command {
  async handle (params) {
    try {
      let weChatPayParams = await this.service('http.orders').createOrder(params);
      if (weChatPayParams) {
        let timeStamp = weChatPayParams['sdk_config']['timestamp']
        let nonceStr = weChatPayParams['sdk_config']['nonceStr']
        let packageInfo = weChatPayParams['sdk_config']['package']
        let paySign = weChatPayParams['sdk_config']['paySign']
        await this.payOrder(timeStamp, nonceStr, packageInfo, paySign);
      }
    } catch (e) {
      console.log('抛出异常', e);
      return false;
    }
  }

  // 重新支付订单
  async payOrder (timeStamp, nonceStr, packageInfo, paySign) {
    await this.service('http.orders').onloadWechatPay(timeStamp, nonceStr, packageInfo, paySign);
  }

  static commandName () {
    return 'CREATE_ORDER';
  }
}
