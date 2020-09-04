
import Command from '@/commands/Command'
export default class PaymentByConsumerCardCommand extends Command {
    async handle (order, recordId) {//type
        let self = this;
        console.log("===================++++++++++++++++++++++==============", [order, recordId]);
        let response = await this.service('http.orders').paymentByConsumeCard(order.id,recordId);
        if (response) {
            this.service('popup').toast(response.message, 'success', 2000);
            setTimeout(function () {
                self.$application.$command('REDIRECT_TO', 'payment.success', 'replace', {query:
                        {
                            order: JSON.stringify(order),
                            type: '消费卡支付',
                            // orderType: type
                            order_nature:'SCAN_CODE_PAY'
                        }});
            }, 2000)
        }
    }
    
    static commandName () {
        return 'PAYMENT_BY_CONSUMER_CARD';
    }
}
