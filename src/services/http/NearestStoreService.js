import Service from '../Service';
export default class NearestStoreService extends Service {
	constructor($application) {
		super($application);
	}

	async store(lng, lat) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.neareststore').mock(lng, lat);
			// console.log(response.data.lng, response.data.lat,"store店铺",response.data.address);
		}else{
			//服务器交互代码
			response = await this.httpGet(`/nearest/store`, {lng: lng, lat: lat });
		}
		return [
					response.data['id'],
					response.data['name'],
					response.data['address'],
		      response.data['lng'],
					response.data['lat']
				];
	}
}
