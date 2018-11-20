import ApiService from './ApiService';
export default class MyOrderCancelService extends ApiService {
	constructor($application) {
		super($application);
	}
	//取消订单
	async update(id) {
		let response = null;
		response = await this.httpGet(`/cancel/order/${id}`, {});
		return response;
	}
}