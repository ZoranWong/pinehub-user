import Service from '../Service';
export default class MyStoreInfoService extends Service {
	constructor($application) {
		super($application);
	}
	// 获取用户信息
	async storeInfo(id) {
		let response = null;
		let storeInfo = null;
		let sellAmountCharts = null;
		let buyNumCharts = null;
		if (this.$application.needMock()) {
			response = await this.services('mock.myStoreInfo').mock(id);
		} else {
			response = await this.httpGet('store/statistics', {
				store_id: id
			});
		}
		storeInfo = response.data;
		sellAmountCharts = storeInfo.sell_amount;
		buyNumCharts = storeInfo.buy_mum;
		return [storeInfo, sellAmountCharts, buyNumCharts];
	}
}
