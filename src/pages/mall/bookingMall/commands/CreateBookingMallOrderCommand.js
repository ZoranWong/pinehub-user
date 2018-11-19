import Command from '@/commands/CreateOrderCommand';
export default class CreateBookingMallOrderCommand extends Command {
  async handle (receiverName, receiverMobile, receiverAddress, ticketCode = null, cardId = null, receivingShopId = null, comment = '') {
    try {
      let params = {
        receiver_name: receiverName,
        receiver_address: receiverAddress,
        receiver_mobile: receiverMobile,
        comment: comment,
        type: 1,
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
