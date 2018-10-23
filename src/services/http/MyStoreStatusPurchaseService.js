import Service from '../Service';
export default class MyStoreStatusPurchaseService extends Service {
	constructor($application) {
		super($application);
	}
	// 获取进货统计
	async purchaseInfo(selectTime) {
		let response = null;
		if (this.$application.needMock()) {
			response = await this.services('mock.myStoreStatusPurchase').mock(selectTime);
		} else {
			response = await this.httpGet('store/purchase/statistics', {
				"date": selectTime
			});
		}
		let [purchaseList, purchaseTotal] = [response.data.orders, response.data.total_amount];
		return [purchaseList, purchaseTotal];
	}
}
