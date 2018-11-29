import Command from '@/commands/CreateOrderCommand';
import { SHOPPING_MALL_ORDER } from '@/Utils/OrderDict';
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
      await super.handle(params);
    } catch (e) {
      console.log('抛出异常', e);
      return false;
    }
  }

  static commandName () {
    return 'CREATE_BOOKING_MALL_ORDER';
  }
}
