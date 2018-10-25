import Service from '../Service';
export default class MyStoreStatusSalesService extends Service {
	constructor($application) {
		super($application);
	}
	// 获取进货统计
	async salesInfo(selectTime) {
		console.log('sale-------service');
		let response = null;
		if (this.$application.needMock()) {
			response = await this.services('mock.myStoreStatusSales').mock(selectTime);
		} else {
			response = await this.httpGet('store/sell/statistics', {
				"date": selectTime
			});
		}
		let [salesInfo, sellTop, merchandiseTop, statics] = [response.data, response.data.sell_top, response.data.merchandise_top,
			response.data.statics
		];
		console.log('sales------service res',[salesInfo, sellTop, merchandiseTop, statics]);
		return [salesInfo, sellTop, merchandiseTop, statics];
	}
}
