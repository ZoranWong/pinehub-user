import Service from '../Service';
export default class MyStoreScanCodeService extends Service {
	constructor($application) {
		super($application);
	}
	// 获取用户信息
	async scanCode(code) {
		let response = null;
		let codeNum = null;
		let status = null;
		if (this.$application.needMock()) {
			response = await this.services('mock.myStoreScanInfo').mock(code);
		} else {
			response = await this.httpGet('store/code/order/merchandise/up', {
				order_code: code
			});
		}
		codeNum = response.data.code;
		status = response.data.status;
		return [codeNum, status];
	}
}
