import ApiService from './ApiService';
export default class MyStoreStatusSalesService extends ApiService {
	constructor($application) {
		super($application);
	}
	// 获取进货统计
	async salesInfo(selectTime) {
		console.log('进货统计调用', selectTime);
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.myStoreStatusSales').mock(selectTime);
		} else {
			response = await this.httpGet('store/sell/statistics', {
				"date": selectTime
			});
		}
		let [salesInfo, sellTop, merchandiseTop, statics] = [response, response.sell_top, response.merchandise_top, response.statics];
		return [salesInfo, sellTop, merchandiseTop, statics];
	}
}