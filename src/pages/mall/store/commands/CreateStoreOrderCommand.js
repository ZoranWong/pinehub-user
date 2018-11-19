import Command from '@/commands/CreateOrderCommand';
export default class CreateStoreOrderCommand extends Command {
	async handle(
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
				receiver_name: receiverName,
				receiver_address: receiverAddress,
				receiver_mobile: receiverMobile,
				build_num: buildingNum,
				room_num: roomNum,
				send_batch: sendBatch,
				comment: comment,
				type: type,
				store_id: storeId
			}
			if(cardId && ticketCode) {
				params['card_id'] = cardId;
				params['card_code'] = ticketCode;
			}
			await super.handle(params);
		} catch(e) {
			console.log('抛出异常', e);
			return false;
		}
	}

	static commandName() {
		return 'CREATE_STORE_ORDER';
	}
}