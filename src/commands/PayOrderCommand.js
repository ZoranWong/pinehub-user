import Command from './Command';
export default class PayOrderCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(type, id) {
		let response = null;
		let self = this;
		console.log('ID支付成功', id);

		let response = await this.service('http.orders').reCreateOrder(id);
		if(response) {
			console.log('支付返回信息', response);
			let timeStamp = response.sdk_config.timestamp;
			let nonceStr = response.sdk_config.nonceStr;
			let packageInfo = response.sdk_config.package;
			let paySign = response.sdk_config.paySign;
			let payResult = await this.service('http.orders').onloadWechatPay(timeStamp, nonceStr, packageInfo, paySign);
		}
	}
	static commandName() {
		return 'PAY_ORDER';
	}
}