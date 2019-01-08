import Command from '@/commands/CreateOrderCommand';
import { SHOPPING_MALL_ORDER, USER_SELF_PICK_UP } from '@/utils/OrderDict';
export default class CreateActivityOrderCommand extends Command {
    async handle (activityId, receivingShopId, receiverName, receiverMobile, receiverAddress, ticketCode = null , cardId = null, comment = '') {
        try {
            let params = {
                receiver_name: receiverName,
                receiver_address: receiverAddress,
                receiver_mobile: receiverMobile,
                comment: comment,
                type: SHOPPING_MALL_ORDER,
                activity_id: activityId,
                receiving_shop_id: receivingShopId,
                pick_up_method: USER_SELF_PICK_UP
            }
            if (cardId && ticketCode) {
                params['card_id'] = cardId;
                params['card_code'] = ticketCode;
            }
            let result = await super.createOrderSign(params);
            if (!result) {
                this.$command('REDIRECT_TO', 'user.orders', 'replace');
            } else {
                this.$command('REDIRECT_TO', 'payment.success', 'replace');
            }
        } catch (e) {
            console.log('抛出异常', e);
            return false;
        }
    }

    static commandName () {
        return 'CREATE_ACTIVITY_ORDER';
    }
}
