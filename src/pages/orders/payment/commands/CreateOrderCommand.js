import Command from '@/commands/CreateOrderCommand';

export default class CreateOrderCommand extends Command {//isBalance
    async handle (receiverName, receiverMobile, storeId, receiverAddress, paymentAmount,  payType = 'wx', cardId = null, coupon = null, comment = '') {
        try {
            let params = {
                shop_id: storeId,
                total_fee: paymentAmount,
                // pay_type: isBalance ? 'balance' : 'wx'
                pay_type:payType
            };
            // let result = await super.createOrderSign(params);
            let result = await this.service('http.orders').createCodeScanOrder(params);
            console.log(result, 'code scan result', payType);
            if (result) {
                switch(payType) {
                    case 'wx': {
                        this.$command('PAYMENT_BY_ID', result)
                        break;
                    }
                    case 'balance': {
                        this.$command('PAYMENT_BY_BALANCE', result)
                        break;
                    }
                    case 'consumer_card': {
                        console.log("============== cunsomer_card ==============");
                        this.$command('PAYMENT_BY_CONSUMER_CARD', result, cardId);
                        break;
                    }
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
