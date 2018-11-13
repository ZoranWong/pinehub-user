import ApiService from './ApiService';
export default class MyStoreStatusPurchaseService extends ApiService {
	constructor($application) {
		super($application);
	}
	// 获取进货统计
	async purchaseInfo(selectTime) {
		let response = null;
		console.log('purchaseInfo', selectTime);
		if(this.$application.needMock()) {
			response = await this.services('mock.myStoreStatusPurchase').mock(selectTime);
		} else {
			try {
				response = await this.httpGet('store/purchase/statistics', {
					"date": selectTime
				});
			} catch(e) {
				console.log('抛出错误', e);
				return false;
				//TODO handle the exception
			}
		}
		let [purchaseList, purchaseTotal] = [response.data.orders, response.data.total_amount];
		return [purchaseList, purchaseTotal];
	}
}