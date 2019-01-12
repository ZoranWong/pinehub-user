import Command from './Command';
export default class CreateOrderCommand extends Command {
    async createOrderSign (params, resetCart = null) {
        try {
            let order = await this.service('http.orders').createPaymentOrder(params);
            let data = await this.service('http.orders').orderPayById(order.id);
            if (data && typeof data['sdk_config'] !== 'undefined') {
                let timeStamp = data['sdk_config']['timestamp']
                let nonceStr = data['sdk_config']['nonceStr']
                let packageInfo = data['sdk_config']['package']
                let paySign = data['sdk_config']['paySign']
                let result = await this.payOrder(timeStamp, nonceStr, packageInfo, paySign);
                return result;
            }else if (typeof data['status'] !== 'undefined' && data['status'] === 300) {
                this.$command('REDIRECT_TO', 'payment.success', 'replace');
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
