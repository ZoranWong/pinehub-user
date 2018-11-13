import ApiService from './ApiService';
export default class MyOrderConfirmService extends ApiService {
	constructor($application) {
		super($application);
	}
	//删除订单
	async update(id) {
		let response = null;
		response = await this.httpGet(`/confirm/order/${id}`, {});
		return response;
	}
}