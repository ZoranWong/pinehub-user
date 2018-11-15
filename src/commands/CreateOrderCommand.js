import Command from './Command';
export default class CreateOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	//merchandiseId, quality = 1, type, id
	async handle(type) {
		let params = {}
		if(type == 'activity') {
			console.log('打印>>>>>>>model', this.$store.getters);
			let storeId = this.$store.getters['model.nearbyStores/selectStore']['id'];
			let activityId = this.$store.getters['model.activity/id'];
			console.log('提交订单成功-----', storeId);
			params = {
				receiver_name: '徐钰',
				receiver_address: '安徽省合肥市蜀山区天一大厦912室',
				receiver_mobile: '18500045825',
				build_num: null,
				room_num: null,
				comment: 'comment',
				type: 1,
				send_time: '7:00 - 9:00',
				activity_id: activityId,
				receiving_shop_id: storeId
			}
		}
		try {
			let weChatPayParams = await this.service('http.orders').createOrder(params);
			if(weChatPayParams) {
				let timeStamp = weChatPayParams.sdk_config.timestamp;
				let nonceStr = weChatPayParams.sdk_config.nonceStr;
				let packageInfo = weChatPayParams.sdk_config.package;
				let paySign = weChatPayParams.sdk_config.paySign;
				this.payOrder(timeStamp, nonceStr, packageInfo, paySign);
			}
		} catch(e) {
			console.log('抛出异常', e);
			throw(e);
			return false;
		}

	}

	//重新支付订单
	async payOrder(timeStamp, nonceStr, packageInfo, paySign) {
		let payResult = await this.service('http.orders').onloadWechatPay(timeStamp, nonceStr, packageInfo, paySign);
	}

	static commandName() {
		return 'CREATE_ORDER';
	}
}