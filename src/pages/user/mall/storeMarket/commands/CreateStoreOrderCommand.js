import Command from '@/commands/CreateOrderCommand';
import { SITE_USER_ORDER } from '@/utils/OrderDict';
export default class CreateStoreOrderCommand extends Command {
    async handle (
        type,
        storeId,
        receiverName,
        receiverMobile,
        receiverAddress,
        buildingNum,
        roomNum,
        sendBatch,
        ticketCode = null,
        cardId = null,
        comment = ''
    ) {
        try {
            let params = {
                type: SITE_USER_ORDER,
                receiver_name: receiverName,
                receiver_address: receiverAddress,
                receiver_mobile: receiverMobile,
                build_num: buildingNum,
                room_num: roomNum,
                send_batch: sendBatch,
                comment: comment,
                pick_up_method: type,
                store_id: storeId
            }
            if (cardId && ticketCode) {
                params['card_id'] = cardId;
                params['card_code'] = ticketCode;
            }
            let result = await super.createOrderSign(params);
            if (!result) {
                this.$command('REDIRECT_TO', 'user.orders', 'replace');
            } else {
                if(cardId && ticketCode) {
                    this.$store.dispatch('model.account/reduceTicket', {count: 1});
                }
                this.$command('REDIRECT_TO', 'payment.success', 'replace');
            }
        } catch (e) {
            console.log('抛出异常', e);
            return false;
        }
    }

    static commandName () {
        return 'CREATE_STORE_ORDER';
    }
}
