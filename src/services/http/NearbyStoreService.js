import Service from '../Service';
export default class NearbyStoreService extends Service {
	constructor($application) {
		super($application);
	}
	
	async store( page = 1, limit = 15) {
			if(this.$application.needMock()) {
			response =  await this.services('mock.nearbyStore').mock(page,  limit);
			console.log(response,"store1111");
		}else{
			//服务器交互代码
			response = await this.httpGet(`/nearby/stores`, {page: page, limit: limit });
		}

		return [response.data['id'],  response.data['name'],
		       		response.data['lng'], response.data['lat'], response.data['address']]; 
	}

}