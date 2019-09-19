import Command from '@/commands/CreateOrderCommand';
import { SHOP_PURCHASE_ORDER, SEND_ORDER_TO_USER, USER_SELF_PICK_UP } from '@/utils/OrderDict';
export default class CreateMerchantOrderCommand extends Command {
	async handle(orderType, receivingShopId, receiverName, receiverMobile, receiverAddress, ticketCode = null, cardId = null, comment = '') {
		try {
			let params = {
				type: SHOP_PURCHASE_ORDER,
				pick_up_method: orderType,
				receiver_name: receiverName,
				receiver_address: receiverAddress,
				receiver_mobile: receiverMobile,
				comment: comment,
				receiving_shop_id: receivingShopId
			}
			if(cardId && ticketCode) {
				params['card_id'] = cardId;
				params['card_code'] = ticketCode;
			}
			let result = await super.createOrderSign(params);
			if(!result) {
				if(orderType === SEND_ORDER_TO_USER) {
					this.$command('REDIRECT_TO', 1, 'go');
				} else if(orderType === USER_SELF_PICK_UP) {
					this.$command('REDIRECT_TO', 2, 'go');
				}
			} else {
				this.$command('REDIRECT_TO', 'merchant.payment.success', 'replace');
			}
		} catch(e) {
			console.log('抛出异常', e);
			return false;
		}
	}

	static commandName() {
		return 'CREATE_MERCHANT_ORDER';
	}
}
