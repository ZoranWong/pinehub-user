import Command from '@/commands/Command'
export default class PaymentByCardCommand extends Command {
    async handle (order, type) {
        console.log(order, '/???????????//////');
        let self = this;
        let response = await this.service('http.orders').paymentByCard(order.id);
        if (response) {
            this.service('popup').toast(response.message, 'success', 2000);
            setTimeout(function () {
                self.$application.$command('REDIRECT_TO', 'payment.success', 'replace', {query:
                        {
                            order: JSON.stringify(order),
                            type: '消费卡支付'
                        }});
            }, 2000)
        }
    }

    static commandName () {
        return 'PAYMENT_BY_CARD';
    }
}
