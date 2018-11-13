import ApiService from './ApiService';
export default class MyStoreInfoService extends ApiService {
	constructor($application) {
		super($application);
	}
	// 获取用户信息
	async storeInfo(id) {
		let response = null;
		let storeInfo = null;
		let sellAmountCharts = null;
		let buyNumCharts = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.myStoreInfo').mock(id);
		} else {
			response = await this.httpGet('store/statistics', {
				store_id: id
			});
		}
		sellAmountCharts = response.sell_amount;
		buyNumCharts = response.buy_mum;
		return [response, sellAmountCharts, buyNumCharts];
	}
}