import ApiService from './ApiService';
export default class NearestStoreService extends ApiService {
	constructor($application) {
		super($application);
	}

	async nearestStore(lng, lat) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.neareststore').mock(lng, lat);
			// console.log(response.data.lng, response.data.lat,"store店铺",response.data.address);
		} else {
			//服务器交互代码
			response = await this.httpGet(`/nearest/store`, {
				lng: lng,
				lat: lat
			});
		}
		console.log('纪晓岚', response.data['id'],
			response.data['name'],
			response.data['address'],
			response.data['lng'],
			response.data['lat'])
		return [
			response.data['id'],
			response.data['name'],
			response.data['address']
		];
	}
}