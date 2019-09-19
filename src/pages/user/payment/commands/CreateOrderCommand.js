import Command from '@/commands/CreateOrderCommand';
import {OFF_LINE_PAYMENT_ORDER, SEND_ORDER_TO_USER} from '@/utils/OrderDict';

export default class CreateOrderCommand extends Command {
    async handle (receiverName, receiverMobile, storeId, receiverAddress, paymentAmount, isBalance = false, ticketCode = null, cardId = null, comment = '') {
        try {
            let params = {
                type: OFF_LINE_PAYMENT_ORDER,
                pick_up_method: SEND_ORDER_TO_USER,
                receiver_name: receiverName,
                receiver_address: receiverAddress,
                receiver_mobile: receiverMobile,
                comment: comment,
                receiving_shop_id: storeId,
                store_id: storeId,
                payment_amount: paymentAmount,
                total_amount: paymentAmount,
                pay_type: isBalance ? 'balance' : 'wx'
            };
            if (cardId && ticketCode) {
                params['card_id'] = cardId;
                params['card_code'] = ticketCode;
            }
            let result = await super.createOrderSign(params);
            if (result) {
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
