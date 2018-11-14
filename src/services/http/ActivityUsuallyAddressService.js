import ApiService from './ApiService';
export default class ActivityUsuallyAddressService extends ApiService {
	constructor($application) {
		super($application);
	}
	//获取优惠券列表
	async list(activityId) {
		let response = null;
		//服务器交互代码
		try {
			response = await this.httpGet(`/receiving/shop/address/${activityId}`);
		} catch(e) {
			console.log('抛出异常', e);
			throw(e);
			return false;
		}
		return response;
	}
}