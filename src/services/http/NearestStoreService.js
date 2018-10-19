import Service from '../Service';
export default class NearestStore extends Service {
	constructor($application) {
		super($application);
	}
	
	async store(lng, lat) {
			if(this.$application.needMock()) {
			response =  await this.services('mock.nearestStore').mock(lng, lat);
			console.log(response,"store1");
		}else{
			//服务器交互代码
			response = await this.httpGet(`/nearest/store`, {lng: lng, lat: lat });
		}

		return [response.data['id'],  response.data['name'],
		       		response.data['lng'], response.data['lat'], response.data['address']]; 
	}

}