import ApiService from './ApiService';
export default class OrdersService extends ApiService {
	constructor($application) {
		super($application);
	}

	// 获取订单列表
	async list(status, page = 1, limit = 15) {
		let orders = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.myOrders').mock(status, page, limit);
		} else {
			response = await this.httpGet(`/${status}/orders`, {
				page: page
			});
		}
		orders = response.data;
		let pagination = response.meta.pagination;
		// 总数
		totalNum = pagination.total;
		// 当前页
		currentPage = pagination['current_page'];
		// 总页数
		totalPage = pagination['total_pages'];
		return [orders, totalNum, currentPage, totalPage];
	}

	// 创建订单
	async createOrder(params) {
		let response = await this.httpPost(`/create/order`, params);
		return response.data;
	}

	// 重新创建订单
	async reCreateOrder(id) {
		let response = null;
		response = await this.httpGet(`/again/order/${id}`, {});
		return response.data;
	}

	// 调用微信支付接口
	async onloadWechatPay(timeStamp, nonceStr, packageInfo, paySign) {
		console.log('timeStamp, nonceStr, packageInfo, paySign', timeStamp, nonceStr, packageInfo, paySign);
		let self = this;
		wx.requestPayment({
			'timeStamp': timeStamp,
			'nonceStr': nonceStr,
			'package': packageInfo,
			'signType': 'MD5',
			'paySign': paySign,
			'success': function(res) {
				console.log('支付成功', res);
				self.services('mp.router').push('myOrderSuccess');
			},
			'fail': function(res) {
				console.log('支付失败', res);
			},
			'complete': function(res) {
				console.log('支付结束', res);
			}
		})
	}

	// 取消订单
	async cancelOrder(id) {
		let response = null;
		response = await this.httpGet(`/cancel/order/${id}`, {});
		return response;
	}

	// 确认收货 确认核销
	async confirmOrder(id) {
		let response = null;
		response = await this.httpGet(`/confirm/order/${id}`, {});
		return response;
	}

	// 店铺-自提订单
	async pickedUpOrders(startTime, endTime, page) {
		console.log('奴家', startTime, endTime)
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.distributeOrder').mock(startTime, endTime, page);
		} else {
			response = await this.httpGet(`store/buffet/orders`, {
				paid_start_time: startTime,
				paid_end_time: endTime,
				page: page
			});
		}
		let orderList = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [orderList, totalNum, currentPage, totalPage];
	}
}