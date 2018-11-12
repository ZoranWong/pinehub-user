import Service from '../Service';
export default class MyStoreModifyStockService extends Service {
	constructor($application) {
		super($application);
	}
	// 提交反馈数据
	async modifyStock(id, primaryStockNum, modifyStockNum, reason, comment) {
		let response = null;
		if (this.$application.needMock()) {
			response = await this.services('mock.myStoreModifyStock').mock(id, primaryStockNum, modifyStockNum, reason, comment);
		} else {
			//服务器交互代码部分
			response = await this.httpPut(`/store/merchandise/${id}/stock`, {
				primaryStockNum: primaryStockNum,
				modifyStockNum: modifyStockNum,
				reason: reason,
				comment: comment
			});
		}
		return [response];
	}

}
