import Command from '@/commands/Command'
export default class PaymentByBalanceCommand extends Command {
    async handle (order) {
        let self = this;
        let response = await this.service('http.orders').paymentByBalance(order.id);
        if (response) {
            this.service('popup').toast(response.message, 'success', 2000);
            setTimeout(function () {
                self.$application.$command('REDIRECT_TO', 'payment.success', 'replace', {query:
                        {
                            order: JSON.stringify(order),
                            type: '余额支付'
                        }});
            }, 2000)
        }
    }
    
    static commandName () {
        return 'PAYMENT_BY_BALANCE';
    }
}
