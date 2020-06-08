import Command from './Command';

export default class PaymentByIdCommand extends Command {
    async handle (order, payType = 'wx') {
        try {
            // await this.service('mp.storage').set('payOrderId', orderId);
            let data = await this.service('http.orders').orderPayById(order.id, payType);
            console.log('---------------------------', data);
            if (data) {
                let timeStamp = data['timestamp'];
                let nonceStr = data['nonceStr'];
                let packageInfo = data['package'];
                let paySign = data['paySign'];
                let result = await this.payOrder(timeStamp, nonceStr, packageInfo, paySign, order);
                console.log(result, '-----------pay result ------------------');
                if (result) {
                    this.$command('REDIRECT_TO', 'payment.success', 'replace', {query: {
                            order: JSON.stringify(order),
                            type: '微信支付'
                        }});
                }
                return result;
            } else if (typeof data['status'] !== 'undefined' && (data['status'] === 300 || data['status'] === 500)) {
                this.$command('REDIRECT_TO', 'payment.success', 'replace', {query: {
                        order: JSON.stringify(order),
                        type: '微信支付'
                }});
            }
        } catch (e) {
            console.log(e);
            // 微信支付失败调用接口


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
    async payOrder (timeStamp, nonceStr, packageInfo, paySign, order) {
        let result = await this.mp.payment.pay(timeStamp, nonceStr, packageInfo, paySign);
        let error = await this.service('http.orders').error(order['order_no']);
        console.log(error, '_______________-error_____________________________________-');
        console.log('-----支付-----', result);
        return result;
    }

    static commandName () {
        return 'PAYMENT_BY_ID';
    }
}
