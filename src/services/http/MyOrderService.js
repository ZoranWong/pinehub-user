import Service from '../Service';
export default class MyOrderService extends Service {
	constructor($application) {
		super($application);
	}
	//获取订单列表
	async list(status = "all", page = 1, limit = 15) {
		let orders = null;
		let totalNum = 0;
		let totalPage = 0;
		let currentPage = 0;
		let response = null;
		console.log('456', this.services('mock.myOrdersMock'));
		console.log('444', this.$application.needMock())
		if(this.$application.needMock()) {
			console.log('888', this.services('mock.myOrdersMock'));
			response = await this.services('mock.myOrdersMock').mock(page, limit);
		} else {
			//服务器交互代码
			response = await this.httpGet(`${status}/orders`, {
				page: page,
				limit: limit
			});
		}
		console.log('1111111');
		orders = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		return [orders, totalNum, currentPage, totalPage];
	}

}