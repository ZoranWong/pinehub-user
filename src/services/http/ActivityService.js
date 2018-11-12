import ApiService from './ApiService';
export default class ActivityService extends ApiService {
	constructor(app) {
		super(app);
	}
	//获取活动信息
	async getActivityInfo() {
		let response = await this.httpGet('/new/activity', {});
		return response.data;
	}
}
