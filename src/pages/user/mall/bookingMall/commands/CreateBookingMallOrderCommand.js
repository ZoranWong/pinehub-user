import Command from '@/commands/CreateOrderCommand';
import { SHOPPING_MALL_ORDER } from '@/utils/OrderDict';
export default class CreateBookingMallOrderCommand extends Command {
    async handle (orderType, receiverName, receiverMobile, receiverAddress, ticketCode = null, cardId = null, receivingShopId = null, comment = '') {
        try {
            let params = {
                type: SHOPPING_MALL_ORDER,
                pick_up_method: orderType,
                receiver_name: receiverName,
                receiver_address: receiverAddress,
                receiver_mobile: receiverMobile,
                comment: comment,
                receiving_shop_id: receivingShopId
            }
            if (cardId && ticketCode) {
                params['card_id'] = cardId;
                params['card_code'] = ticketCode;
            }
            let result = await super.createOrderSign(params);
            if (!result) {
                this.$command('REDIRECT_TO', -1, 'go');
            } else {
                this.$command('REDIRECT_TO', 'payment.success', 'replace');
            }
        } catch (e) {
            console.log('抛出异常', e);
            return false;
        }
    }

    static commandName () {
        return 'CREATE_BOOKING_MALL_ORDER';
    }
}
