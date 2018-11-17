import Command from '@/commands/CreateOrderCommand';
export default class CreateActivityOrderCommand extends Command {
  async handle (activityId, receivingShopId, sendTime, receiverName, receiverMobile, receiverAddress, comment = '') {
    try {
      let params = {
        receiver_name: receiverName,
        receiver_address: receiverAddress,
        receiver_mobile: receiverMobile,
        comment: comment,
        type: 1,
        send_time: sendTime,
        activity_id: activityId,
        receiving_shop_id: receivingShopId
      }
      await super.handle(params);
    } catch (e) {
      console.log('抛出异常', e);
      return false;
    }
  }

  static commandName () {
    return 'CREATE_ACTIVITY_ORDER';
  }
}
