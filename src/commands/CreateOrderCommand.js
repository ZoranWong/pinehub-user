import Command from './Command';

export default class CreateOrderCommand extends Command {
    // 支付
    async createOrderSign (params, resetCart = null) {
        try {
            let payType = params['pay_type'];
            delete params['pay_type'];
            let order = await this.service('http.orders').createPaymentOrder(params);
            if (order.id && !this.paid) {
                this.orderId = order.id;
            }
            let result = await this.$command('PAYMENT_BY_ID', this.orderId, payType);
            if (result) {
                this.paid = true;
            } else {
                this.paid = false;
            }
            if (result) {
                this.$command('REDIRECT_TO', 'payment.success', 'replace', {query: {order_id: this.orderId}});
            }
            return result;
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
