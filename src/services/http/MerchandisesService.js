 import ApiService from './ApiService';
export default class MerchandisesService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(route,  page = 1, search = null, limit = 10) {
		let merchandises = null;
		let totalNum = 0;
		let currentPage = 0;
		let totalPage = 0;
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.services('mock.merchandises').mock(page, search, limit);
			// console.log(response,"list");
		}else{
			//服务器交互代码
			response = await this.httpGet(route, {page: page, limit: limit, searchJson: search});
		}
		// console.log(response, "this.httpGet")
		merchandises = response.data;
		let pagination = response.meta.pagination;
		totalNum = pagination.total;
		currentPage = pagination['current_page'];
		totalPage = pagination['total_pages'];
		console.log('services',  totalNum, currentPage, totalPage, page);
		return [merchandises, totalNum, currentPage, totalPage, limit];
	}
	async activity(activityId, page = 1, search = null, limit = 10) {
		let route = `/new/activity/${activityId}/merchandises`;
		return await this.list(route, page, search, limit);
	}

	async today(storeId,  categoryId, page = 1, search = null, limit = 10) {
		let route = `/store/${storeId}/category/${categoryId}/merchandises`;
		return await this.list(route, page, search, limit);
	}

	async storeNewMerchandises(storeId, page = 1, search = null, limit = 10) {
		let route = `/store/${storeId}/new/merchandises`;
		return await this.list(route, page, search, limit);
	}


	async addMerchandises(merchandiseId, storeId, quality) {
		let response = null;
		// let qua  = response.data.quality;
		
		if(this.$application.needMock()) {
			response =  await this.services('mock.addmerchandises').mock(merchandiseId, storeId, quality);
			console.log(response, '1899' ,response.data.name);

		}else{
			//服务器交互代码
			response = await this.httpPost( `/add/merchandises`, 
				{merchandise_id: merchandiseId, store_id:storeId, quality:quality});
			console.log( response, "coffee")
		}
			console.log(response.data['quality'])
		return   [response.data['id'],  response.data['name'],
		       		response.data['quality'], response.data['sell_price'], response.data['message'],
		       		response.data['amount']]; 
	}  

	//清空购物车
	async emptyMerchandises(storeId){
		console.log("storeId清空购物车")
		let response = null;
		
		if(this.$application.needMock()) {			
			response = await this.services('mock.emptyMerchandises').mock(storeId);
			console.log('empty response', response.data);
		} else {
			//服务器交互代码
			response = await this.httpGet(`/empty/merchandise/${storeId}`, {
				store_id: storeId
			});
		}
		return response.data['delete_count'];
	}	 
    


    async search(name, page = 2){
    	let response = null;
    	if(this.$application.needMock()){
    		response  = await this.services('mock.search').mock(name, page);
    		console.log(response,'search')
    	}else{
    		//服务器交互代码
    		response = await this.httpGet(`/reserve/search/merchandises 
				`, {name:name, page: page })
    	}
    }
	// async uploadMaterial(appId, type, fileField, file, title = null, introduction = null) {
	// 	let response = null;
	// 	let request = new FormData();
	// 	request.append('app_id', appId);
	// 	request.append(fileField, file);
	// 	request.append('file_field', fileField);
	// 	if(title)
	// 		request.append('title', title);
	// 	if(introduction)
	// 		request.append('introduction', introduction);
	// 	if(this.$application.needMock()) {
	// 		response =  await this.services('mock.material.upload').mock(request);
	// 	}else{
	// 		//服务器交互代码
	// 		response = await this.httpPost(`${type}/material`, request);
	// 	}
	// 	return response.data;
	// }
}	