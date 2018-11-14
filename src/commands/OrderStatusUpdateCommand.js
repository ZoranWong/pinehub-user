import Command from './Command';
export default class OrderStatusUpdateCommand extends Command {
	constructor(app) {
		super(app);
	}
	//取消订单
	async cancelOrder(id) {
		let response = await this.service('http.orders').cancelOrder(id);
		if(response.data) {
			wx.showToast({
				title: "订单已取消",
				icon: "none"
			})
		}
	}
	//核销订单
	async verificationOrder(id) {
		let response = await this.service('http.orders').confirmOrder(id);
		if(response.data) {
			wx.showToast({
				title: "订单已核销",
				icon: "none"
			})
		}
	}
	//确认收货
	async receiptOrder(id) {
		let response = await this.service('http.orders').confirmOrder(id);
		if(response.data) {
			wx.showToast({
				title: "订单已收货",
				icon: "none"
			})
		}
	}
	//订单支付
	async payOrder() {

	}
	//重新支付订单
	async rePayOrder(id) {
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
	refresh() {
		let self = this;
		setTimeout(function() {
			self.$application.$command('router', 'myorder', 'replace');
		}, 1500);
	}
	async handle(type, id) {
		let response = null;
		let self = this;
		if(type == 'rePay') {
			this.rePayOrder(id);
		} else if(type == 'cancel') {
			wx.showModal({
				title: '温馨提示',
				content: '确认取消此订单？',
				success(res) {
					if(res.confirm) {
						self.cancelOrder(id);
						self.refresh();
					}
				}
			})
		} else if(type == 'verification') {
			wx.showModal({
				title: '温馨提示',
				content: '确认核销此订单？',
				success(res) {
					if(res.confirm) {
						self.verificationOrder(id);
						self.refresh();
					}
				}
			})
		} else if(type == 'receipt') {
			wx.showModal({
				title: '温馨提示',
				content: '此订单确认已收货？',
				success(res) {
					if(res.confirm) {
						self.receiptOrder(id);
						self.refresh();
					}
				}
			})
		}
	}
	static commandName() {
		return 'ORDER_STATUS_UPDATE';
	}
}