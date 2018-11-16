import ApiService from './ApiService';
export default class MyStoreService extends ApiService {
	constructor($application) {
		super($application);
	}
	// 修改库存
	async modifyStock(id, primaryStockNum, modifyStockNum, reason, comment) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.myStoreModifyStock').mock(id, primaryStockNum, modifyStockNum, reason, comment);
		} else {
			console.log('修改库存', id, primaryStockNum, modifyStockNum, reason, comment);
			//服务器交互代码部分
			response = await this.httpPut(`/store/merchandise/${id}/stock`, {
				primary_stock_num: primaryStockNum,
				modify_stock_num: modifyStockNum,
				reason: reason,
				comment: comment
			});
		}
		return [response.data];
	}

}