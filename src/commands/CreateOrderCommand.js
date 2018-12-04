import Command from './Command';
export default class CreateOrderCommand extends Command {
    async createOrderSign (params, resetCart = null) {
        try {
            let weChatPayParams = await this.service('http.orders').createPaymentOrder(params);
            if (weChatPayParams) {
                let timeStamp = weChatPayParams['sdk_config']['timestamp']
                let nonceStr = weChatPayParams['sdk_config']['nonceStr']
                let packageInfo = weChatPayParams['sdk_config']['package']
                let paySign = weChatPayParams['sdk_config']['paySign']
                let result = await this.payOrder(timeStamp, nonceStr, packageInfo, paySign);
                return result;
            }
        } catch (e) {
            console.log(e);
            let response = e['response'];
            if (response && response['data']) {
                if (response['data']['code'] === 20001) {
                    this.popup.toast('参数错误', 'warn', 2000);
                }
            }
            return false;
        }
    }

    // 重新支付订单
    async payOrder (timeStamp, nonceStr, packageInfo, paySign) {
        let result = await this.mp.payment.pay(timeStamp, nonceStr, packageInfo, paySign);
        return result;
    }

    static commandName () {
        return 'CREATE_ORDER';
    }
}
