import Command from '@/commands/CreateOrderCommand';

export default class CreateOrderCommand extends Command {
    async handle (receiverName, receiverMobile, storeId, receiverAddress, paymentAmount, isBalance = false, ticketCode = null, cardId = null, comment = '') {
        try {
            let params = {
                shop_id: storeId,
                total_fee: paymentAmount,
                pay_type: isBalance ? 'balance' : 'wx'
            };
            // let result = await super.createOrderSign(params);
            let result = await this.service('http.orders').createCodeScanOrder(params);
            console.log(result, 'code scan result');
            if (result) {
                if (isBalance) {
                    this.$command('PAYMENT_BY_BALANCE', result)
                } else {
                    this.$command('PAYMENT_BY_ID', result)
                }
                // this.$command('REDIRECT_TO', 'payment.success', 'replace', {
                //     query: {
                //         order_id: this.orderId
                //     }
                // });
            }
        } catch (e) {
            console.log('抛出异常', e);
            return false;
        }
    }

    static commandName () {
        return 'CREATE_OFF_LINE_ORDER';
    }
}
