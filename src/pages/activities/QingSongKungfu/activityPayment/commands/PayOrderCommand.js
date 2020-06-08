import Command from '../../../../../commands/Command';
export default class PayOrderCommand extends Command {
    async handle (type, id) {
        let response = await this.service('http.orders').orderPayById(id);
        if (response) {
            let timeStamp = response.sdk_config.timestamp;
            let nonceStr = response.sdk_config.nonceStr;
            let packageInfo = response.sdk_config.package;
            let paySign = response.sdk_config.paySign;
            let result = await this.mp.payment.pay(timeStamp, nonceStr, packageInfo, paySign);
            return result;
        }
        return false;
    }
    static commandName () {
        return 'PAY_ORDER';
    }
}
